# Plan: Per-page unique SEO verification + CI runtime hardening

Status: PLANNED (not started) · Created 2026-07-06 · Owner: Bruno

Follow-up to the shipped CI gate (`.github/workflows/ci.yml`, `scripts/i18n-seo-check.mjs`).
The gate today validates **presence** of SEO tags, not **uniqueness**. Two separate
improvements are captured here so they can be picked up later.

---

## Part A — Per-page unique SEO verification

### Why

The current SEO gate asserts, per page x locale: non-empty `<title>`, non-empty
meta description, self canonical, the full hreflang set, `og:url == canonical`,
`<html lang>`, and (for non-EN) that title/description/body differ from the EN
render. It does **not** check that titles, descriptions, and social cards are
**unique and page-specific**. So a page can ship a duplicate or generic
title/description/og:image and still pass — which hurts ranking (duplicate
titles/descriptions are a classic Google SEO warning) and social sharing
(a generic card instead of a page-specific one).

### Findings (2026-07-06)

| Fact | Detail |
|---|---|
| Titles/descriptions | Static pages use unique `metaTitle_<pageKey>` / `metaDescription_<pageKey>` keys. Project detail pages now use `"<name> · WB Digital Solutions"` + the project description. Uniqueness is likely but **unenforced** — nothing fails on a duplicate. |
| Social cards (og:image) | `2 of 14` projects have **no own `imageUrl`** (`ai-agents`, `financas`) and fall back to `defaultOgImage()` → the shared `og-projects[-locale].jpg` card. Their social preview is the generic Projects card, not a project-specific one. |
| Fallback behavior | `src/lib/seoUrls.ts` `defaultOgImage(pageKey, locale)` returns `og-<pageKey>[-locale].jpg` (home as last resort). This is correct as a *fallback* but should be *detectable* by the gate so shared cards are visible, not silently accepted. |

### Proposed gate additions (`scripts/i18n-seo-check.mjs`)

All are **cross-row** checks (run once after every page x locale row is captured),
so they slot in after the current per-row `runChecks`:

1. **Unique title per locale** — within each locale, no two pages may share the
   exact `<title>`. Report each collision (both URLs).
2. **Unique description per locale** — same, for meta description.
3. **Page-specific og:image** — flag any page whose `og:image` resolves to a
   `defaultOgImage()` fallback (i.e. `og-<pageKey>` without a page-specific
   asset). Start as a **warning tier** (see below), not a hard failure, since
   some pages legitimately share a section card.
4. (Optional) **Title length / description length** sanity (e.g. title <= 60,
   description 50–160 chars) — Google truncation guidance. Warning tier.

### Design decisions to make first

- **Failure vs warning tiers.** Uniqueness of title/description should probably
  be a **hard failure** (real duplicate-content risk). Own-card and length
  checks are advisory — introduce a `WARN`-level result so the gate can surface
  them without blocking CI. The current gate is pass/fail only; add a third
  state and print warnings without affecting the exit code (or gate them behind
  `--strict`).
- **Scope of uniqueness.** Per locale is the right axis (a `/pt` page and its
  `/` counterpart *should* differ by language, so global uniqueness would false-
  positive). Compare within the same `locale.hreflang` bucket.
- **The 2 cardless projects** (`ai-agents`, `financas`): either add a
  `projects/<slug>-cover.jpg` (as the other 12 have) to `imageUrl` in all 4
  locale JSONs, or accept the generic Projects card. Product decision.

### Acceptance

- Gate reports zero duplicate titles/descriptions per locale across all
  discovered pages.
- Gate lists (warning tier) every page still on a fallback og card.
- No regression to the existing presence checks; `production-check` stays green.

### Effort

Medium-small. One function in `i18n-seo-check.mjs` (collect `{locale -> {title,
desc} -> [urls]}` maps, report collisions) + a warning tier in the reporter.
Optionally 8 JSON edits (4 locales x 2 projects) if we add the two missing cards.

---

## Part B — CI runtime & action hardening

### Why

`.github/workflows/ci.yml` currently pins deprecated versions. CI is green (these
are warnings), but two things drift from best practice:

1. **Action majors** `actions/checkout@v4` and `actions/setup-node@v4` run on the
   **node20 action runtime** that GitHub is deprecating in favor of node24 — the
   source of the deprecation warning in the logs.
2. **`node-version: 20`** for the build: Node 20 reached end-of-life (~2026-04),
   and **Vercel's production runtime default is Node 24**. Building CI on a
   different Node major than production risks drift (green in CI, broken in prod
   or vice versa).

### Proposed changes

| Change | From | To | Rationale |
|---|---|---|---|
| `actions/checkout` | `@v4` | `@v5` | node24 action runtime; clears warning |
| `actions/setup-node` (both jobs) | `@v4` | `@v5` | same |
| `node-version` | `20` | `24` | parity with Vercel production runtime; Node 20 EOL |
| `pnpm/action-setup` | `@v4` | latest major | check for a newer major; minor |

### Notes

- Confirm the latest tags at implementation time (`v5` assumed current for
  checkout/setup-node in 2026 — verify before pinning).
- Bumping `node-version` is the change that actually matters (runtime parity);
  the action bumps are cosmetic (silence the warning).
- Validate on a branch push (the `quality` job must stay green) before merging.

### Acceptance

- No deprecation warnings in the Actions log.
- `quality` job green on Node 24, matching the Vercel build runtime.

### Effort

Trivial. ~4 line change in `ci.yml`, validated by one branch push.

---

## Suggested sequencing

Part B first (trivial, removes noise, aligns runtime), then Part A (the real SEO
value). Neither blocks the other.
