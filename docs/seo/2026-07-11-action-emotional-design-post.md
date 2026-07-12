# Action log — emotional-website-design post overhaul

**Date:** 2026-07-11 · **Page:** `/blog/how-emotional-design-can` (+ /pt /it /es)
**Goal:** move this post from GSC position ~82 toward page 1 for "emotional
website design" (the only non-brand query the whole site ranks for) and speak to
business owners about why a beautiful, emotional site wins customers.

This is the first "implement" step of the SEO program (see `seo-ops` skill,
`keyword-plan-*` and the `2026-07-11-baseline.md` zero point).

## What shipped (commits c93f251 + footer fix)

Rewrote the post in all 4 locales (natively localized, correct diacritics; local
keyword per market: pt-BR "design emocional de sites", it "design emozionale dei
siti web", es "diseño web emocional"). Reviewed twice by a senior-SEO-copywriter
pass; all top findings addressed.

## Live verification (production URL, as Googlebot) — original audit problems

Fetched `https://www.wbdigitalsolutions.com/blog/how-emotional-design-can` after
deploy READY and confirmed each previously-identified problem is fixed:

| Original problem (buried at pos 82) | Status now |
|---|---|
| Title targeted "customer experience", not the query | ✅ title = "Emotional Website Design: Why a Beautiful Site Wins Customers" |
| "emotional website design" appeared 0x in body | ✅ 13x, natural (H1, intro, headings, body) |
| Meta description = generic blog-index fallback | ✅ post-specific, 144 chars |
| No statistics / read like an opinion essay | ✅ cited block: 50ms (Lindgaard 2006), 94% (Northumbria/Sheffield), 75% (Stanford/Fogg) |
| Two fabricated "Unknown Author" pull-quotes | ✅ removed; one real attributed Don Norman quote |
| No first-party experience (E-E-A-T) | ✅ "How We Apply Emotional Design at WB" (own 3D hero + Revalida Italia) |
| No sibling-query coverage | ✅ FAQ section (5 Qs) incl. "emotional UI vs website design" |
| Off-intent "beyond the screen" (physical stores) | ✅ cut |
| Norman levels as pure theory | ✅ reframed to business outcomes |
| Thin (~900 words) | ✅ ~1528 rendered words |
| dateModified auto-bumped every build | ✅ explicit dateModified 2026-07-11 in BlogPosting schema; datePublished kept honest (2024-05-20) |
| No visible date | ✅ localized byline + "Updated July 2026" / "Atualizado em julho de 2026" |
| Meta i18n / byline i18n | ✅ per-locale; byline label dropped ("Bruno Vieira · <date>") |
| LCP 5.2s (all images eager) | ✅ only first in-content image eager, rest lazy |
| FAQPage schema | ✅ intentionally NOT added (Google retired FAQ rich results May 2026); FAQ is content-only for AI-Overview/GEO |

Also fixed a regression surfaced by the rename: the Footer "Recent Blogs" widget
still linked to this post with the OLD title. Updated `DesignEmotional` in all 5
locale files (en/es/it/ptbr/pt) to the new keyword-rich title (a site-wide
internal link with better anchor text).

## Next steps (recorded, not blocking)

1. **Show the work, do not just describe it (top remaining lever).** The
   first-party proof is currently text-only; the 3 images are the old generic
   blog art. Add a REAL screenshot of the Revalida Italia interactive 3D anatomy
   environment (or WB's own 3D hero) with descriptive alt ("Interactive 3D
   anatomy environment we built for Revalida Italia"). Owner to provide the
   image. If Revalida has one true, shareable metric (real time-on-task or
   completion lift), add it next to the screenshot, only if real.
2. **Authority / off-page (now the real bottleneck).** On-page is no longer the
   limiter; ranking from pos 82 needs links + internal-authority flow: link INTO
   this post from `/websites` and from a couple of other blog posts (not just
   out of it), and earn a few relevant backlinks. This is the phase that cracks
   page 1.
3. **Re-measure in ~3-4 weeks:** pull GSC position for "emotional website
   design" (+ siblings) and record movement vs the 2026-07-11 zero point in a
   new `docs/seo/` snapshot; update the plans' tracking tables.

Minor follow-up: the Footer "Recent Blogs" hardcoded dates ("06 de out, 2023")
are stale/format-fixed; low priority.

---

## Internal linking + /websites baseline (2026-07-12)

Started step 2 (authority / internal links). Added **one contextual internal
link** from the `/websites` "Our Approach" section into this post, in all 4
locales (locale keys `approachEmotionalLead` + `approachEmotionalLink`; the
anchor carries each market's local keyword, e.g. EN "See why a beautiful site
wins customers", pt-BR "Veja por que um site bonito conquista clientes").

Decision: **a single high-value contextual link, not several.** Google's
first-link-priority means only the first anchor to a URL on a page counts, the
site-wide footer "Recent Blogs" link is boilerplate (discounted), and adding a
header/extra link to the same post would read as over-optimized. Note:
`OurApproach` is `ssr:false`, so the link is client-rendered (Google renders JS;
consistent with the rest of the page body). Committed locally, not yet pushed.

### /websites page GSC baseline (zero point for re-measure)
Window: last 90 days and last 16 months are identical (measured 2026-07-12).

| Page | Impressions | Clicks | Avg position |
|---|---|---|---|
| /websites (EN) | 32 | 1 | 7.7 |
| /pt, /it, /es /websites | 0 | 0 | - |

Only one query drives /websites: **"wbdesign"** (a brand typo), position 45.

**Reading:** the money page ranks well *when shown* (pos 7.7) but is shown for
almost nothing, and for **zero non-brand / commercial queries**. This confirms
the keyword-plan gap: `/websites` needs its own target-keyword work (3D /
Three.js / web-design-agency terms per `keyword-plan-*`), not just inbound links
from the blog. Re-measure both the post and `/websites` at the next snapshot.
