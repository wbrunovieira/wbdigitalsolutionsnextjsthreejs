# i18n URL Migration Plan (www.wbdigitalsolutions.com)

Branch: `feat/i18n-locale-urls` · Status: WAVES 0-4 DONE, gate green on localhost AND preview; awaiting owner review for merge (P6)

## Why

The CV-subdomain pilot proved the point: with single-URL i18n, **search engines only ever see the EN render** of every WB page. The PT/IT/ES content (fully translated in the locale JSONs, including 16 per-page meta keys per language) is invisible to Google, and every page has a single-language title/description/og for social sharing. Per-locale URLs fix indexing, ranking in each market, and localized link previews.

## Investigation findings (2026-07-05)

| Fact | Detail |
|---|---|
| Pages to migrate | `/` (home), `/websites`, `/systems`, `/ai`, `/automation`, `/projects`, `/projects/[slug]`, `/contact`, `/blog`, `/blog/[id]` (6 posts), `/newsletter`. Excluded: `/3d-showcase`, `/3d-tunnel` (full-screen experiences), `/dev` + `/vendas` (CV subdomains, already migrated with their own scheme). |
| Rendering today | Only `blog/[id]` has getStaticProps/Paths. **Every other page is a static shell**: content AND meta resolve client-side from LanguageContext/TranslationContext, so the SSR HTML (what crawlers index) is always EN. |
| Meta plumbing | `PageHead.tsx` already reads localized `metaTitle_<pageKey>` / `metaDescription_<pageKey>` keys (present in all 4 JSONs) — the translations exist, only the URL dimension is missing. Canonical = `baseUrl + router.asPath`; hreflang = x-default only (correct for the current single-URL model). |
| Messages loading | `TranslationContext` statically imports `en.json` and dynamically imports other locales **client-side only** — root cause of EN-only SSR. |
| Blog content | Per-locale post files already exist (`src/locales/blog/{en,es,it,ptbr}/`). |
| Sitemap | `/api/sitemap.xml` lists single-URL pages; per-host CV sitemaps are separate and stay untouched. |
| Legacy redirects | `next.config.js` 308s `/es|it|pt-BR(/*)` → `/` **scoped to the www host** (added when the old sitemap's locale URLs 404'd). They must be replaced by real routes + mapping redirects in this migration. |
| `<Html lang>` | `_document.tsx` already renders a dynamic `lang` attribute. |

## Architecture decision

**Chosen: Next.js built-in i18n routing** (`i18n: { locales: ['en','pt','it','es'], defaultLocale: 'en', localeDetection: false }`).

- Automatically gives every route (including dynamic `blog/[id]`, `projects/[slug]`) locale-prefixed variants; `<Link>` auto-prefixes with the active locale; `getStaticProps` receives `locale`.
- Root stays EN (+ `x-default`) for continuity with everything Google has indexed; `/pt`, `/it`, `/es` are pure additive gains. URL slugs are short (`pt`), hreflang emits `pt-BR`; a small map converts URL locale ↔ app language code.
- `localeDetection: false`: no Accept-Language auto-redirect (Google guideline; the language switcher persists the user's choice instead).

Rejected alternatives (recorded for posterity):
- **Per-page optional catch-alls (the CV pilot pattern)**: does not compose with dynamic segments (`/pt/blog/[id]` would need a root-level catch-all that conflicts with every route). Right for the flat CV subdomains, wrong for the full site.
- **App Router + next-intl**: the correct stack *if* we ever migrate to App Router, but that is a separate, much larger project; not needed to get URL-level i18n.

CV coexistence: built-in i18n also creates `/pt/dev/...`-style variants of the CV routes. They are harmless (CV canonicals point to the subdomain URLs) but P3 adds hygiene redirects collapsing them.

## Phases

### P1 — Foundation (make SSR speak all 4 languages)
- [x] `next.config.js`: add the `i18n` block (locales, defaultLocale en, localeDetection false).
- [x] `src/lib/i18n.ts`: URL locale ↔ app lang maps (`pt` ↔ `pt-BR`) + `getI18nStaticProps(locale)` helper that loads the locale's messages server-side and returns them as pageProps.
- [x] `LanguageContext`: language derives from `router.locale` (fallback to stored preference off-route); `setLanguage` = `router.push(asPath, undefined, { locale })` + persist. Public API (`language`, `setLanguage`, `isLoaded`) unchanged so consumers stay untouched.
- [x] `TranslationProvider`: accept `initialMessages` from pageProps (SSR-correct), keep the dynamic import as client-side fallback.
- [x] Add `getStaticProps` via the helper to all static pages (required: without it, Next only prerenders the default locale).
- [x] `blog/[id]` + `projects/[slug]`: `getStaticPaths` must emit paths × locales (`locales.flatMap`); merge messages into their existing props.

### P2 — SEO layer
- [x] `PageHead`: locale-aware canonical (self URL with prefix), full hreflang matrix (en, pt-BR, it, es + x-default → en) on every page, `og:locale`, localized og:title/description (already localized once SSR is per-locale).
- [x] `/api/sitemap.xml`: emit all 4 URL variants per page (with `xhtml:link` hreflang alternates, as in the CV sitemaps).
- [x] `_document` lang: verify it picks the request locale.

### P3 — Redirects & routing hygiene
- [x] REMOVE the legacy www kill-redirects for `/es|it|pt-BR`.
- [x] ADD mapping redirects `/pt-BR/:path*` → `/pt/:path*` (the old sitemap URLs finally resolve to real pages; ends the GSC "Página com redirecionamento" saga cleanly).
- [x] Collapse locale-prefixed CV variants: `/:locale(pt|it|es)/dev/:path*` → `/dev/:path*` (idem vendas).
- [x] Confirm CV subdomain rewrites and per-host assets are untouched.

### P4 — Polish
- [x] Per-locale OG cards for the main pages (reuse the Playwright generator from the CV work) — at minimum a localized og-home per language.
- [x] GA4 note: paths gain locale prefixes; decide on content grouping / no action.
- [x] Bundle/props audit: whole-locale messages ride each page's props; if payloads get heavy, split messages per page (follow-up, not a blocker).

### P5 — FINAL ACCEPTANCE GATE (owner-mandated)
**No phase item above may be checked off as "done" until this gate passes.**

- [x] Build the validation script `scripts/i18n-seo-check.mjs` (Playwright): for EVERY page × EVERY locale URL (11 pages × 4 locales = 44 URLs + 6 blog posts × 4 = up to 68), render the page and CAPTURE:
  - `<title>` and `meta[name=description]` — must be in the URL's language;
  - `link[rel=canonical]` — must be the self locale URL;
  - the full hreflang set — must list all 4 + x-default;
  - `og:title`, `og:description`, `og:image`, `og:url`, `og:locale` and twitter equivalents;
  - `<html lang>` attribute;
  - a content sample (h1/first paragraph) proving the BODY is in the URL's language, not just the meta.
- [x] The script outputs a matrix report (URL × captured fields, pass/fail per cell) — failures block the checklist.
- [x] Run the same capture on the Vercel PREVIEW deployment of the branch (not only localhost).
- [x] Lighthouse spot-check (mobile) on `/pt` home + one localized inner page: Perf ≥ 90, SEO 100.

### P6 — Rollout & monitoring
- [ ] Vercel preview URL from the branch → owner review (nothing merges to main before his OK — align-before-deploy rule).
- [ ] Merge → deploy → re-run the P5 capture against production.
- [ ] GSC: resubmit sitemap, then monitor Indexing → Pages weekly; expect ranking flux for 2–6 weeks while hreflang settles.

## Risks

| Risk | Mitigation |
|---|---|
| Temporary ranking fluctuation | Root URLs keep serving the same EN content at the same addresses; locale URLs are additive. |
| Message payload per page | Measure in P5; split per page if needed. |
| Old `/pt-BR/*` history flip-flop | The P3 mapping redirects give those URLs a real destination for the first time. |
| Analytics path fragmentation | GA4 note in P4. |
| CV route variants | Hygiene redirects in P3. |

## Execution model: parallel sub-agent waves

Phases don't map 1:1 to execution. Work is grouped by FILE OWNERSHIP so agents
never collide, and everything independent runs in parallel:

- **Wave 0 — shared core (sequential, main session).** The pieces every agent
  depends on and that touch shared files: `next.config.js` i18n block,
  `src/lib/i18n.ts` (locale maps + `getI18nStaticProps`), `LanguageContext`
  (router.locale-driven), `TranslationProvider` (initialMessages). Small but
  load-bearing; done centrally, validated with tsc before fanning out.
- **Wave 1 — seven agents in parallel** (each owns disjoint files):
  A) pages home+websites+systems · B) pages ai+automation+contact+newsletter ·
  C) projects index+[slug] (locale-aware paths) · D) blog index+[id]
  (getStaticPaths × locales, messages merged into existing props) ·
  E) PageHead SEO layer (locale canonical, hreflang matrix, og:locale) ·
  F) sitemap API × 4 locales with hreflang alternates ·
  G) the P5 validation script `scripts/i18n-seo-check.mjs` (spec is known,
  needs nothing from waves 0-1).
- **Wave 2 — integration (main session).** P3 redirects in next.config
  (untouched by wave 1), tsc, resolve any agent overlaps.
- **Wave 3 — gate run.** Execute the P5 capture matrix on localhost; fan out
  FIX agents per failing page if needed; re-run until green. P4 OG-card agent
  runs in parallel with this wave.
- **Wave 4 — preview.** Push the branch (Vercel builds a PREVIEW, production
  untouched), re-run the capture against the preview URL, Lighthouse spot,
  then owner review before any merge.

Agent ground rules (in every prompt): English comments/commits, 200-line file
cap, `npx tsc --noEmit` must pass, NEVER run `pnpm build` or restart the dev
server, no em-dashes in user-facing copy, all 4 locales or none.

## Estimated effort
Wave 0: ~1h. Waves 1-3: the wall-clock of the slowest agent (~1-2h) instead of a serial day. Wave 4 + monitoring: preview review + weeks of GSC watching.
