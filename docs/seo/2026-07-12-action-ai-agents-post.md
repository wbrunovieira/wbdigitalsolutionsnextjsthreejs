# Action log — AI Agents for Business post (launch + analysis)

**Date:** 2026-07-12 · **Page:** `/blog/ai-agents-for-business` (+ /pt /it /es)
**Goal:** rank + be cited by AI for "AI agents for business" / "agentes de IA
para empresas" and educate business owners (demystify: an agent is the same AI
with one specific job; it solves hallucination / starting-from-zero / no-standard;
augments, not replaces). New top-of-funnel pillar for the /ai and /automation
services. This is the second "implement" step of the SEO program (after the
emotional-design post; see `2026-07-11-action-emotional-design-post.md`).

## What shipped (commits: post launch + modern BlogPost + LCP tweak 0c63042)

- **New post, 4 locales**, natively localized with correct diacritics, 11
  sections each: intro, what-is-an-agent (bold extractable definition), the 3
  problems of loose AI, in-practice (button/upload/lives-in-WhatsApp), by-industry
  (accounting/clinic/law/e-commerce), multi-agents-only-when-needed, not-magic +
  data/LGPD, does-not-replace + margin math, low-risk pilot, FAQ (6 Q&A),
  "and this is what WB does" CTA.
- **3 on-brand images** generated via Vertex (Gemini 3 Pro Image), placed at
  sections [0,3,6] via the new `imageSections` prop; all with alt text.
- **BlogPost.tsx modernized**: brand category pills (amber dot), H2 amber accent
  bar, `text-balance` H1, figure/blockquote brand tint, localized date byline +
  back button, `BlogShare` block (WhatsApp/LinkedIn/Instagram/Email).
- **Wiring**: added to `blogPostIds`, blog index (first), `sitemap.xml.ts`
  BLOG_POSTS; internal links to `/ai`, `/automation`, `/contact`.

## Advanced SEO + performance analysis (production, mobile)

Measured live after deploy READY.

| Category | Score |
|---|---|
| SEO | 100 |
| Best Practices | 100 |
| Accessibility | 96 |
| Performance | 93 |

**Core Web Vitals (lab):** CLS 0 · TBT 50-70ms · FCP 1.4s · LCP 2.8s · SI ~4.2s.

**Content / GEO (as Google/AI sees it):**
- Title 76 chars keyword-front-loaded · meta 156 chars · robots index/follow
- 1 H1 · 11 question-shaped H2s · ~1825 words · "agente(s) de ia" 11x natural
- hreflang full matrix (en/es/it/pt-BR/x-default) · self canonical
- Schema: BlogPosting + Person(author) + Breadcrumb + ImageObject, with
  datePublished + explicit dateModified
- Extractable bold definition + FAQ (6 Qs) = ready for AI Overviews / Perplexity
  citation (FAQPage schema intentionally NOT added; Google retired FAQ rich
  results May 2026, so FAQ is content-only for GEO)
- 6 images, 0 missing alt · LGPD mentioned (the skeptical-director objection)

## LCP investigation (the "ajuste LCP" task)

Attempted to push LCP under the 2.5s "good" line. Added `sizes="(max-width: 768px)
100vw, 768px"` to the in-content images so next/image caps the served variant at
the article's real width (~768px) instead of the default 100vw (which offered up
to 1920w/3840w in the preload srcset). **Kept** — it is a correct real-world byte
saving (helps slow connections / CrUX field data).

**But lab LCP did not move (stayed 2.8s), and the diagnosis explains why:**
`prioritize-lcp-image` audit returned N/A, meaning **the LCP element is TEXT
(the H1 / intro paragraph), not the hero image** (the image sits below the intro).
The LCP is gated by app-wide JS: main-thread work 2.0s + bootup 0.8s + ~109 KiB
unused JS (250ms) from the shared 217 KB First-Load bundle. No render-blocking,
no image/font/server issue on this page.

**Reading:** LCP here is limited by the whole-app hydration cost, not by anything
post-specific. Pushing < 2.5s is a **site-wide** effort (trim shared/unused JS),
not a per-page fix. Performance is already 93 (green); not chasing it further on
this one page.

## Next steps (recorded, not blocking)

1. **Re-measure GSC in ~3-4 weeks** (target ~2026-08-02): pull position for
   "agentes de IA para empresas" / "AI agents for business" + siblings and record
   movement vs the 2026-07-11 zero point (currently not ranking, brand-new URL).
2. **Internal links INTO this post** (authority flow, same lesson as the
   emotional-design post): link from `/ai` and `/automation` service pages with
   keyword-rich anchors, not just out of the post. First-link-priority applies.
3. **Site-wide LCP/JS** (separate project, affects every page): reduce the 217 KB
   shared First-Load bundle / ~109 KiB unused JS to lift LCP under 2.5s across the
   whole site. Out of scope for a single post.
