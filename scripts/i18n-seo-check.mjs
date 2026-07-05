#!/usr/bin/env node
/**
 * i18n SEO acceptance gate (docs/i18n-migration-plan.md, P5).
 *
 * For EVERY page x locale URL, renders the page with Playwright and verifies:
 *   canonical = self locale URL, full hreflang set (4 locales + x-default),
 *   og:url = canonical, <html lang> matches, non-empty title/description,
 *   and that pt/it/es title+description+body sample DIFFER from the EN render.
 *
 * Usage:
 *   node scripts/i18n-seo-check.mjs [--base=http://localhost:3000]
 *                                   [--json=report.json]
 *                                   [--blog=id1,id2]        (override blog post ids)
 *                                   [--pw-path=/abs/node_modules]  (playwright location)
 *
 * Exit code: 0 = all green, 1 = at least one failure.
 * Dependency-free besides Playwright (resolved from local node_modules or --pw-path).
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const require = createRequire(import.meta.url);
// Fallback Playwright install used during the migration work sessions.
const PW_FALLBACK =
  '/private/tmp/claude-501/-Users-brunovieira-projects-wbdigitalsolutionsnextjsthreejs/ecb46dd9-1853-4e88-82f3-77f7e5938774/scratchpad/pw/node_modules';

// ---------- CLI ----------
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  })
);
const BASE = String(args.base || 'http://localhost:3000').replace(/\/$/, '');

// ---------- Playwright resolution ----------
function loadChromium() {
  const candidates = [];
  if (args['pw-path']) candidates.push(String(args['pw-path']));
  try {
    return require('playwright').chromium;
  } catch {
    /* not installed locally, try candidates */
  }
  candidates.push(PW_FALLBACK);
  for (const dir of candidates) {
    try {
      return createRequire(path.join(dir, 'noop.js'))('playwright').chromium;
    } catch {
      /* try next */
    }
  }
  console.error('Could not resolve Playwright. Install it or pass --pw-path=/abs/path/to/node_modules');
  process.exit(2);
}

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

const STATIC_PAGES = ['', '/websites', '/systems', '/ai', '/automation', '/projects', '/contact', '/blog', '/newsletter'];
const PAGES = [...STATIC_PAGES, ...readBlogPostIds().map((id) => `/blog/${id}`)];

const LOCALES = [
  { url: '', hreflang: 'en', htmlLang: 'en' },
  { url: '/pt', hreflang: 'pt-BR', htmlLang: 'pt-BR' },
  { url: '/it', hreflang: 'it', htmlLang: 'it' },
  { url: '/es', hreflang: 'es', htmlLang: 'es' },
];
const REQUIRED_HREFLANGS = [...LOCALES.map((l) => l.hreflang), 'x-default'];

// ---------- Capture (runs in the browser) ----------
const CAPTURE_FN = () => {
  const meta = (sel) => document.querySelector(sel)?.getAttribute('content')?.trim() ?? '';
  const sampleEl = document.querySelector('h1') || document.querySelector('h2') || document.querySelector('p');
  return {
    title: document.title.trim(),
    description: meta('meta[name="description"]'),
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
    hreflangs: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => ({
      hreflang: l.getAttribute('hreflang'),
      href: l.getAttribute('href'),
    })),
    ogTitle: meta('meta[property="og:title"]'),
    ogDescription: meta('meta[property="og:description"]'),
    ogImage: meta('meta[property="og:image"]'),
    ogUrl: meta('meta[property="og:url"]'),
    ogLocale: meta('meta[property="og:locale"]'),
    twitterTitle: meta('meta[name="twitter:title"]') || meta('meta[property="twitter:title"]'),
    twitterDescription: meta('meta[name="twitter:description"]') || meta('meta[property="twitter:description"]'),
    twitterImage: meta('meta[name="twitter:image"]') || meta('meta[property="twitter:image"]'),
    htmlLang: document.documentElement.getAttribute('lang') ?? '',
    contentSample: (sampleEl?.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 200),
  };
};

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
async function main() {
  const chromium = loadChromium();
  const browser = await chromium.launch();
  const bpage = await (await browser.newContext()).newPage();
  const rows = [];

  for (const page of PAGES) {
    const enLocale = LOCALES[0];
    let enCap = null;
    for (const locale of LOCALES) {
      const url = BASE + locale.url + (page || (locale.url ? '' : '/'));
      const row = { url: (locale.url + page) || '/', page, locale: locale.hreflang, fullUrl: url };
      try {
        await bpage.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await bpage.waitForTimeout(600); // small settle wait for client hydration
        row.capture = await bpage.evaluate(CAPTURE_FN);
        if (locale === enLocale) enCap = row.capture;
        row.checks = runChecks(row.capture, page, locale, enCap);
      } catch (err) {
        row.error = String(err.message || err).split('\n')[0];
        row.checks = Object.fromEntries(CHECKS.map((c) => [c, { pass: false, detail: `LOAD ERROR: ${row.error}` }]));
      }
      rows.push(row);
    }
  }
  await browser.close();

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
