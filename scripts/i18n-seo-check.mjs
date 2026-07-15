#!/usr/bin/env node
/**
 * i18n SEO acceptance gate (docs/i18n-migration-plan.md, P5).
 *
 * For EVERY page x locale URL, fetches the server-rendered HTML and verifies:
 *   canonical = self locale URL, full hreflang set (4 locales + x-default),
 *   og:url = canonical, <html lang> matches, non-empty title/description,
 *   and that pt/it/es title+description+body sample DIFFER from the EN render.
 *
 * All checked tags are emitted server-side (next/head), so a plain fetch sees
 * everything a browser would: no Playwright, no browser binary, zero deps.
 *
 * Usage:
 *   node scripts/i18n-seo-check.mjs [--base=http://localhost:3000]
 *                                   [--json=report.json]
 *                                   [--blog=id1,id2]        (override blog post ids)
 *
 * Exit code: 0 = all green, 1 = at least one failure.
 * Zero runtime dependencies (Node 18+ global fetch).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ---------- CLI ----------
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  })
);
const BASE = String(args.base || 'http://localhost:3000').replace(/\/$/, '');

// ---------- Pages & locales ----------
function readBlogPostIds() {
  if (args.blog) return String(args.blog).split(',').map((s) => s.trim()).filter(Boolean);
  try {
    const src = fs.readFileSync(path.join(ROOT, 'src/pages/blog/[id].tsx'), 'utf8');
    const m = src.match(/const blogPostIds\s*=\s*\[([\s\S]*?)\]/);
    const ids = [...(m?.[1] ?? '').matchAll(/["']([^"']+)["']/g)].map((x) => x[1]);
    if (ids.length) return ids;
  } catch {
    /* fall through to hardcoded list */
  }
  // Keep in sync with src/pages/blog/[id].tsx blogPostIds.
  return ['do-i-need-a-website', 'how-emotional-design-can', 'digital-can-transform-company', 'chatgpt-for-smes', 'increase-pme-sales'];
}

/**
 * AUTO-DISCOVERY (owner-mandated): the page list is derived from the
 * filesystem + data sources so a NEW page/post/project enters the gate the
 * day it is born; nothing is silently out of coverage. CV subdomain routes,
 * full-screen 3D pages and API routes are excluded by design.
 */
const SKIP_DIRS = new Set(['api', 'dev', 'vendas', '3d-showcase', '3d-tunnel']);
// Error pages are intentionally noindex with no canonical/hreflang — not SEO pages.
const SKIP_FILES = new Set(['404', '500']);

function discoverStaticPages() {
  const pages = [];
  const walk = (dir, route) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) {
        if (SKIP_DIRS.has(e.name)) continue;
        walk(path.join(dir, e.name), `${route}/${e.name}`);
      } else if (e.name.endsWith('.tsx') && !e.name.startsWith('_') && !e.name.includes('[')) {
        const base = e.name.replace(/\.tsx$/, '');
        if (SKIP_FILES.has(base)) continue;
        pages.push(base === 'index' ? route : `${route}/${base}`);
      }
    }
  };
  walk(path.join(ROOT, 'src/pages'), '');
  return pages.sort();
}

function readProjectSlugs() {
  try {
    const src = fs.readFileSync(path.join(ROOT, 'src/data/projectDetails.ts'), 'utf8');
    const body = src.split(/export const PROJECT_DETAILS[^{]*\{/)[1] ?? '';
    return [...body.matchAll(/^\s{2}['"]?([a-z0-9-]+)['"]?:/gm)].map((m) => m[1]);
  } catch {
    return [];
  }
}

const STATIC_PAGES = discoverStaticPages();
const PAGES = [
  ...STATIC_PAGES,
  ...readBlogPostIds().map((id) => `/blog/${id}`),
  ...readProjectSlugs().map((slug) => `/projects/${slug}`),
];

/** Page <-> sitemap parity: a page missing from the sitemap or a sitemap URL
    with no page behind it (like the old dead /experience entry) is a failure. */
async function sitemapParityFailures() {
  try {
    const res = await fetch(BASE + '/sitemap.xml');
    if (!res.ok) return [{ url: '/sitemap.xml', check: 'sitemap', detail: `HTTP ${res.status}` }];
    const xml = await res.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
      new URL(m[1]).pathname.replace(/\/$/, '').replace(/^\/(pt|it|es)(?=\/|$)/, '')
    );
    const inSitemap = new Set(locs);
    const expected = new Set(PAGES);
    const failures = [];
    for (const p of expected) {
      if (!inSitemap.has(p)) failures.push({ url: p || '/', check: 'sitemap', detail: 'page exists but is MISSING from sitemap.xml' });
    }
    for (const p of inSitemap) {
      if (!expected.has(p)) failures.push({ url: p || '/', check: 'sitemap', detail: 'sitemap URL has no page behind it (dead entry)' });
    }
    return failures;
  } catch (err) {
    return [{ url: '/sitemap.xml', check: 'sitemap', detail: `fetch failed: ${err.message}` }];
  }
}

const LOCALES = [
  { url: '', hreflang: 'en', htmlLang: 'en' },
  { url: '/pt', hreflang: 'pt-BR', htmlLang: 'pt-BR' },
  { url: '/it', hreflang: 'it', htmlLang: 'it' },
  { url: '/es', hreflang: 'es', htmlLang: 'es' },
];
const REQUIRED_HREFLANGS = [...LOCALES.map((l) => l.hreflang), 'x-default'];

// ---------- Capture (parsed from the server-rendered HTML, no browser) ----------
const ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'", '&apos;': "'", '&nbsp;': ' ' };
const decode = (s) => s.replace(/&(?:amp|lt|gt|quot|apos|nbsp|#39|#x27);/g, (m) => ENTITIES[m] ?? m);
const stripTags = (s) => decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

// Find a <meta> tag identified by attr=val (order-agnostic), then read its content.
function metaContent(html, attr, val) {
  const tag = html.match(new RegExp(`<meta[^>]*\\b${attr}=["']${val}["'][^>]*>`, 'i'))?.[0];
  return tag ? decode((tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] ?? '').trim()) : '';
}
// Find a <link rel="relVal"> tag and read its href.
function linkHref(html, relVal) {
  const tag = html.match(new RegExp(`<link[^>]*\\brel=["']${relVal}["'][^>]*>`, 'i'))?.[0];
  return tag ? (tag.match(/\bhref=["']([^"']*)["']/i)?.[1] ?? '') : '';
}

// Mirror of the old browser capture, read straight from the SSR markup.
// hreflang is matched case-insensitively (next/head emits it as `hrefLang`).
function captureFromHtml(html) {
  // Body-language sample: prefer the first real paragraph. An h1 is often a
  // proper noun (project/brand names) that is legitimately identical across
  // languages and would false-positive the SAME_AS_EN check.
  const sample =
    [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => stripTags(m[1])).find((t) => t.length > 40) ||
    stripTags(html.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i)?.[1] ?? html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? '');
  return {
    title: decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '').trim()),
    description: metaContent(html, 'name', 'description'),
    canonical: linkHref(html, 'canonical'),
    hreflangs: [...html.matchAll(/<link[^>]*\brel=["']alternate["'][^>]*>/gi)]
      .map((m) => ({
        hreflang: m[0].match(/\bhreflang=["']([^"']*)["']/i)?.[1] ?? '',
        href: m[0].match(/\bhref=["']([^"']*)["']/i)?.[1] ?? '',
      }))
      .filter((h) => h.hreflang),
    ogTitle: metaContent(html, 'property', 'og:title'),
    ogDescription: metaContent(html, 'property', 'og:description'),
    ogImage: metaContent(html, 'property', 'og:image'),
    ogUrl: metaContent(html, 'property', 'og:url'),
    ogLocale: metaContent(html, 'property', 'og:locale'),
    twitterTitle: metaContent(html, 'name', 'twitter:title') || metaContent(html, 'property', 'twitter:title'),
    twitterDescription: metaContent(html, 'name', 'twitter:description') || metaContent(html, 'property', 'twitter:description'),
    twitterImage: metaContent(html, 'name', 'twitter:image') || metaContent(html, 'property', 'twitter:image'),
    htmlLang: html.match(/<html[^>]*\blang=["']([^"']*)["']/i)?.[1] ?? '',
    contentSample: sample.slice(0, 200),
  };
}

// Normalize a URL to its pathname without trailing slash ('' for root).
function pathOf(url) {
  try {
    return new URL(url, BASE).pathname.replace(/\/$/, '');
  } catch {
    return null;
  }
}

// ---------- Checks ----------
const CHECKS = ['canonical', 'hreflang', 'og:url', 'htmlLang', 'title', 'desc', 'i18n'];

function runChecks(cap, page, locale, enCap) {
  // Both normalized to '' for the root, '/pt/blog/x' style otherwise.
  const selfPath = (locale.url + page).replace(/\/$/, '');
  const canonPath = cap.canonical ? pathOf(cap.canonical) : null;
  const found = new Set(cap.hreflangs.map((h) => h.hreflang));
  const missing = REQUIRED_HREFLANGS.filter((h) => !found.has(h));
  const results = {};
  const fail = (name, detail) => (results[name] = { pass: false, detail });
  const pass = (name) => (results[name] = { pass: true });

  canonPath !== null && canonPath === selfPath
    ? pass('canonical')
    : fail('canonical', `canonical "${cap.canonical}" -> path "${canonPath ?? 'MISSING'}", expected "${selfPath || '/'}"`);
  missing.length === 0 ? pass('hreflang') : fail('hreflang', `missing hreflang: ${missing.join(', ')} (found: ${[...found].join(', ') || 'none'})`);
  cap.ogUrl && cap.ogUrl === cap.canonical ? pass('og:url') : fail('og:url', `og:url "${cap.ogUrl}" != canonical "${cap.canonical}"`);
  cap.htmlLang === locale.htmlLang ? pass('htmlLang') : fail('htmlLang', `<html lang="${cap.htmlLang}">, expected "${locale.htmlLang}"`);
  cap.title ? pass('title') : fail('title', 'empty <title>');
  cap.description ? pass('desc') : fail('desc', 'empty meta description');

  // Language heuristic: non-EN meta + body sample must differ from the EN render.
  if (!enCap || locale.hreflang === 'en') {
    pass('i18n');
  } else {
    const same = [];
    if (cap.title && cap.title === enCap.title) same.push('title');
    if (cap.description && cap.description === enCap.description) same.push('description');
    if (cap.contentSample && cap.contentSample === enCap.contentSample) same.push('contentSample');
    const metaSame = same.includes('title') && same.includes('description');
    metaSame || same.includes('contentSample')
      ? fail('i18n', `SAME_AS_EN: ${same.join(', ')} identical to the EN render`)
      : pass('i18n');
  }
  return results;
}

// ---------- Main ----------
async function fetchHtml(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 30000);
  try {
    const res = await fetch(url, { redirect: 'follow', signal: ctrl.signal, headers: { 'user-agent': 'i18n-seo-gate' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const rows = [];

  for (const page of PAGES) {
    const enLocale = LOCALES[0];
    let enCap = null;
    for (const locale of LOCALES) {
      const url = BASE + locale.url + (page || (locale.url ? '' : '/'));
      const row = { url: (locale.url + page) || '/', page, locale: locale.hreflang, fullUrl: url };
      try {
        row.capture = captureFromHtml(await fetchHtml(url));
        if (locale === enLocale) enCap = row.capture;
        row.checks = runChecks(row.capture, page, locale, enCap);
      } catch (err) {
        row.error = String(err.message || err).split('\n')[0];
        row.checks = Object.fromEntries(CHECKS.map((c) => [c, { pass: false, detail: `LOAD ERROR: ${row.error}` }]));
      }
      rows.push(row);
    }
  }

  // ---------- Terminal matrix ----------
  const urlWidth = Math.max(...rows.map((r) => r.url.length), 4) + 2;
  console.log('\n' + 'URL'.padEnd(urlWidth) + CHECKS.map((c) => c.padEnd(10)).join(''));
  console.log('-'.repeat(urlWidth + CHECKS.length * 10));
  for (const r of rows) {
    console.log(r.url.padEnd(urlWidth) + CHECKS.map((c) => (r.checks[c].pass ? '✓' : '✗').padEnd(10)).join(''));
  }

  const failures = rows.flatMap((r) =>
    CHECKS.filter((c) => !r.checks[c].pass).map((c) => ({ url: r.url, check: c, detail: r.checks[c].detail }))
  );
  const parity = await sitemapParityFailures();
  if (parity.length === 0) console.log(`\nsitemap parity: ${PAGES.length} pages <-> sitemap.xml ✓`);
  failures.push(...parity);
  if (failures.length) {
    console.log(`\n${failures.length} FAILURE(S):`);
    for (const f of failures) console.log(`  ✗ ${f.url} [${f.check}] ${f.detail}`);
  } else {
    console.log(`\nAll ${rows.length} URLs passed all ${CHECKS.length} checks.`);
  }

  if (args.json) {
    const out = path.resolve(String(args.json));
    fs.writeFileSync(out, JSON.stringify({ base: BASE, generatedAt: new Date().toISOString(), checks: CHECKS, rows, failures }, null, 2));
    console.log(`\nJSON report written to ${out}`);
  }
  process.exit(failures.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
