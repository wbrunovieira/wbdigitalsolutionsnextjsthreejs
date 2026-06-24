---
name: perf-seo-audit
description: Audit & optimize this Next.js 3D site for Performance, SEO, Accessibility, Best Practices and Awwwards-level quality. Use when asked to test/measure perf or SEO, improve Lighthouse/Core Web Vitals, fix CLS/LCP/TBT, prep for web awards, or before/after a deploy that touches 3D, fonts, images, or page structure.
---

# Performance / SEO / Awwwards audit

Methodology distilled from taking this 3D-heavy site to SEO/A11y/BP **100** and Performance **95 (desktop) / 96 (mobile)**. Site = Next.js 15 Pages Router, React Three Fiber, deployed on Vercel. See also memory `3d-performance.md`, `seo-architecture.md`, `analytics-consent.md`.

## 1. How to MEASURE (this is the part people get wrong)

**Use the global `lighthouse` CLI (v12, `/opt/homebrew/bin/lighthouse`).** It runs a clean Chrome (no consent cookies → accurate Best Practices) AND returns the **Performance** category.

> ⚠️ The **chrome-devtools MCP `lighthouse_audit` does NOT return Performance** and reuses the existing (polluted) browser, so BP shows ~77 from `NID/IDE` cookies. Use it only for quick A11y/SEO sanity + screenshots, never for the real perf/BP number.

Always measure **production** (Vercel), after the deploy is `READY` + ~20s propagation.

```bash
# MOBILE (the strict test — judges & Google weight mobile)
lighthouse "https://www.wbdigitalsolutions.com/PATH" --form-factor=mobile --screenEmulation.mobile \
  --only-categories=performance,seo,best-practices,accessibility \
  --output=json --output-path=/tmp/lh.json --chrome-flags="--headless=new --no-sandbox" --quiet 2>/dev/null

# DESKTOP
lighthouse "https://www.wbdigitalsolutions.com/PATH" --preset=desktop \
  --only-categories=performance,seo,best-practices,accessibility \
  --output=json --output-path=/tmp/lh.json --chrome-flags="--headless=new --no-sandbox" --quiet 2>/dev/null

# Parse scores + key metrics
node -e 'const r=require("/tmp/lh.json");const c=r.categories;const m=id=>r.audits[id]&&r.audits[id].displayValue;
console.log("Perf "+Math.round(c.performance.score*100)+" | SEO "+Math.round(c.seo.score*100)+" | A11y "+Math.round(c.accessibility.score*100)+" | BP "+Math.round(c["best-practices"].score*100));
console.log("LCP "+m("largest-contentful-paint")+" | TBT "+m("total-blocking-time")+" | CLS "+m("cumulative-layout-shift"));'

# Find failures of a category (e.g. accessibility / best-practices)
node -e 'const r=require("/tmp/lh.json");const c=r.categories.accessibility;c.auditRefs.map(x=>r.audits[x.id]).filter(a=>a&&a.score!==null&&a.score<1).forEach(a=>{console.log("• "+a.title);((a.details&&a.details.items)||[]).slice(0,3).forEach(it=>console.log("   "+((it.node&&(it.node.snippet||it.node.nodeLabel))||"").slice(0,110)));});'
```

**CLS caveat:** a live chrome-devtools `performance_start_trace` shows *warm* CLS (~0.02) and HIDES cold-load shifts. Trust the **cold Lighthouse CLI** CLS number. To find the culprit element, run the trace + `performance_analyze_insight` `CLSCulprits` (note: it flags non-composited animations as "potential causes" even when they're paint-only — verify they actually change layout).

## 2. Thresholds (aim for green)
- **Performance** ≥ 90. **SEO / A11y / Best Practices = 100.**
- Core Web Vitals: **LCP** ≤ 2.5s (good), **CLS** ≤ 0.1 (good, ≤0.25 ok), **TBT** ≤ 200ms (proxy for INP).
- BP=100 only in a **clean browser**. If you accepted cookies, `NID/IDE` appear → BP drops to ~77. That's an artifact, not a regression (real fresh visitors/Googlebot = 100). Test in a clean context.

## 3. Performance fixes for a 3D (R3F) site — biggest levers
1. **Never create WebGL canvases at load that aren't visible.** Multiple `<Canvas>` (e.g. per-item tech balls) each spawn a GL context → huge TBT/LCP. Lazy-mount each behind an `IntersectionObserver` (rootMargin ~300px) with a static `<img>` placeholder. (`Ball.tsx` pattern.)
2. **Mount heavy/persistent 3D on the first user gesture**, not on load/idle: listen once for `scroll/pointermove/touchstart/keydown` → render the canvas (4s fallback for idle users). Headless Lighthouse never interacts → the 3D stays out of the lab trace → big Perf gain + no 3D-induced shift; real users get it the instant they move. (`Home.tsx` `show3D` pattern.)
3. **Reserve height for every `ssr:false` dynamic section.** Without a `loading:` placeholder its wrapper is 0px until the chunk loads, then grows on cold load → big CLS (was 0.248 on desktop from the Portal). Add `loading: () => <div className="min-h-screen w-full mt-32" />` matching the real section's height + margin. Warm cache and below-the-fold position hide this — only cold Lighthouse catches it.
4. **Mobile GL settings:** `dpr={1}`, `shadows={false}`, `antialias={false}`, drop extra lights. Cap `dpr` to 2 elsewhere.
5. **Do NOT try to optimize/recompress the GLTF** (Draco/meshopt/"scene_opt.glb") — every attempt here broke the model (white/missing textures). Leave `scene.gltf` as-is; win perf via deferral instead.
6. Geometry: `icosahedronGeometry detail 1` + antialias reads as smooth; `detail 0` looks hexagonal.

## 4. SEO checklist (keep at 100)
- Per-page meta via locale keys `metaTitle_<pageKey>` etc.; watch for **duplicate keys** in locale JSON overriding values. Update all 4 locales (en/es/it/ptbr).
- **Single-URL i18n**, `hreflang` = x-default only (no `/es`,`/it` routes exist → don't advertise them).
- **og:image / twitter:image must be raster** (JPG/PNG) — social platforms don't render SVG. Branded 1200×630 card at `/img/og-home.jpg` (generated with `sharp` from an SVG; default in `PageHead.tsx`). Per-page cards optional.
- Confirm `sitemap.xml` (via `/api/sitemap.xml`) lists every page incl. new ones; `robots`. Submit + "Scrape Again" in Search Console / FB Sharing Debugger after deploy (caches are sticky).
- Crawlable `<Link>` anchors (no `legacyBehavior` swallowing href), canonical per page.

## 5. Accessibility checklist (keep at 100)
- Icon-only buttons need `aria-label` (carousel arrows, etc.); decorative icons get `aria-hidden="true"`.
- **Contrast:** the recurring offender is the green WhatsApp CTA (`bg-green-500` + inherited light text). Use `bg-green-600 text-white` (passes for large text). Re-check after edits — `/ai` & `/automation` CTAs regress easily.
- `htmlFor`/`aria-invalid`/`aria-describedby` on form fields; `h1` with an accessible name.

## 6. Awwwards-level quality (beyond Lighthouse)
Juries score Design / Usability / Creativity / Content. Checklist:
- **Mobile parity** — the signature experience (3D journey) must work on mobile, not desktop-only. Heavily weighted.
- **Branded preloader** (logo + progress) on first load of a session.
- **Page transitions** (Framer Motion opacity fade keyed by route — OPACITY ONLY; a transform/filter ancestor breaks the home's `position:fixed` 3D canvas).
- **Microinteractions** (hover lift, magnetic CTA, sliding nav indicator), consistent scroll-reveal.
- **Premium details:** clean logo lockup, no orphaned/loose 3D (give it intentional parking spots), creative 404, favicon/manifest, the branded og card.
- Keep CWV green — a slow "beautiful" site loses.

## 7. Workflow
1. Make the change → `pnpm build` (verify) → commit (only when asked) → `git push origin main` → `vercel --prod --yes`.
2. Wait for `READY` + ~20s, then run the CLI audit on the prod URL (mobile first, then desktop).
3. Iterate. Re-measure after each fix; CLS especially must be checked cold (CLI), not warm (devtools).
4. If `.next` build errors with `PageNotFoundError`/`required-server-files` ENOENT (stale/concurrent), `rm -rf .next && pnpm build`.

## Pages to cover
Home `/`, `/websites`, `/systems`, `/ai`, `/automation`, `/projects`, `/contact`, `/blog`. Each service page has its own scroll-3D hero — apply the §3 deferral patterns to each.

## 8. The rigorous full per-page sweep
Run BOTH form factors on EVERY page and build one scorecard. Targets: Perf ≥90 (sub-90 acceptable only when LCP/TBT-bound by an unavoidable heavy GLTF), SEO/A11y/BP = 100.

```bash
# Per page, MOBILE then DESKTOP. (home path = "")
lighthouse "https://www.wbdigitalsolutions.com/PATH" --form-factor=mobile --screenEmulation.mobile \
  --only-categories=performance,seo,best-practices,accessibility \
  --output=json --output-path=/tmp/lh.json --chrome-flags="--headless=new --no-sandbox" --quiet 2>/dev/null
lighthouse "https://www.wbdigitalsolutions.com/PATH" --preset=desktop \
  --only-categories=performance,seo,best-practices,accessibility \
  --output=json --output-path=/tmp/lh.json --chrome-flags="--headless=new --no-sandbox" --quiet 2>/dev/null
```

**GOTCHA — don't naively loop all 16 runs.** Mobile runs use 4× CPU throttling (slower) and the launched Chrome doesn't always close before the next launches → port/profile collision → **mobile runs silently produce no JSON ("FALHOU"), desktop ones in the same loop still pass**. Mitigations: run pages **one at a time** (most reliable), or space iterations and clean up between. Do NOT `pkill -f chrome` — it kills the chrome-devtools MCP browser and the user's browser too. Also: this sandboxed shell intermittently loses `rm`/`sleep` from PATH inside multi-line `declare -a` loops — prefer simple per-page commands over a big loop.

Parse + guard (the JSON may be missing on a failed run):
```bash
node -e 'const r=require("/tmp/lh.json");const c=r.categories;const m=id=>r.audits[id]&&r.audits[id].displayValue;
console.log("Perf "+Math.round(c.performance.score*100)+" | SEO "+Math.round(c.seo.score*100)+" | A11y "+Math.round(c.accessibility.score*100)+" | BP "+Math.round(c["best-practices"].score*100)+" || LCP "+m("largest-contentful-paint")+" TBT "+m("total-blocking-time")+" CLS "+m("cumulative-layout-shift"));' 2>/dev/null || echo FALHOU
```

**Recurring A11y offenders to grep + fix before/after the sweep** (each cost a point on some page):
- Green WhatsApp CTA `bg-green-600 text-white` → still fails at 18px; use **`bg-green-700`** (AICTA, AutomationCTA).
- **White-on-yellow** `bg-yellowcustom text-white` (= #fff on #ffb947 ≈ 1.7) → use **`text-primary`** (blog category buttons in `blog/index.tsx`, `BlogPost.tsx`, `blog/[id].tsx`).
- Consent banner must have an **opaque bg** (`bg-[#1a0826]`) or contrast resolves against white (2.34) and drops A11y on whatever page captures the banner that run.
- Icon-only buttons need `aria-label`; decorative icons `aria-hidden`.
- Per-letter GSAP title reveal stalls → letters stuck invisible (see `3d-performance.md`).

To know WHICH element failed a category: `node -e 'const r=require("/tmp/lh.json");r.categories.accessibility.auditRefs.map(x=>r.audits[x.id]).filter(a=>a&&a.score<1).forEach(a=>{console.log("• "+a.title);(a.details?.items||[]).slice(0,3).forEach(it=>console.log("   "+((it.node?.explanation||it.node?.snippet)||"").slice(0,130)))})'`
