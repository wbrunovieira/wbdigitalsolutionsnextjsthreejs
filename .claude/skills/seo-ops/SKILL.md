---
name: seo-ops
description: Resume the SEO program for wbdigitalsolutions.com — tools installed, Google Search Console access, how to pull/re-measure keyword positions, where the records and per-language keyword plans live, what schema has shipped, and the research→plan→implement→re-measure workflow. Use whenever the task is SEO for this site: measuring rankings, checking GSC data, continuing the keyword plans, implementing target-keyword content/pages, or recording whether a change improved positions.
---

# SEO Operations Runbook — wbdigitalsolutions.com

Durable state of the SEO program so it can resume without reloading everything
into context. Program started 2026-07-11.

## The workflow (the whole point)

**research → plan → implement → re-measure → record improvement.**
Everything is versioned under `docs/seo/`. Never invent keyword volumes (no paid
API); ground research in real SERP/autocomplete/PAA/competitor evidence via web
search. Record the CURRENT GSC position of every target so improvement is
measurable against the zero-point baseline.

## Records & plans — source of truth (in the repo)

`docs/seo/` (committed):
- `README.md` — index of the folder.
- `2026-07-11-baseline.md` — the "photograph": full technical + GSC baseline,
  incl. **section 5b = zero-point positions of all 32 primary target keywords**
  (all "not ranking" on 2026-07-11). Diff future snapshots against this.
- `keyword-plan-ptbr.md` / `-en.md` / `-it.md` / `-es.md` — per-language plans,
  one market each (Brazil / US-global / Italy / Spain). Each has, per service
  line (Websites, Automation, Platforms-Systems, AI): a target-keyword table
  (intent, competition, current GSC position, target page, content action), a
  Top-8 roadmap, and a tracking table.

Do NOT duplicate keyword lists into this skill — read the plan files. When work
progresses, update the plans' tracking tables and add a new dated snapshot.

## Baseline finding (why the plans look the way they do)

Mature 2-year-old site, technically excellent (Lighthouse SEO/BP 100/100), but
**near-zero non-brand search visibility**: 50 unique queries in 16 months, ~74%
branded. Only non-brand demand is the emotional-design blog cluster (buried at
pos ~82). Strategy: skip directory/enterprise-locked head terms; win the
low-competition lanes — **3D/Three.js websites, n8n automation, custom AI
agents/RAG, SaaS-MVP + landing pages** — plus pricing-guide content for GEO/AI
Overviews and lead capture.

## Tools installed

| Tool | What | Where |
|---|---|---|
| `claude-seo` v2.2.0 | `/seo` skill suite (24 sub-skills, offline, no API key): technical, content/E-E-A-T, schema, GEO, hreflang, sitemap, cluster, backlinks, etc. | `~/.claude/skills/seo*` + subagents in `~/.claude/agents/` |
| Lighthouse CLI | perf/SEO/BP audits | `/opt/homebrew/bin/lighthouse` |
| GSC via service account | real query/click/CTR/position data | see below |
| Python venv (for GSC + claude-seo scripts) | `google-api-python-client` etc. | `~/.claude/skills/seo/.venv/bin/python` |

NOT connected (paid, deferred by owner): Ubersuggest MCP, DataForSEO, GA4, PageSpeed/CrUX API key.

## Google Search Console access

- **Property:** `sc-domain:wbdigitalsolutions.com` (domain property).
- **Auth:** service account `claude-seo@claude-seo-502119.iam.gserviceaccount.com`
  added to GSC as a **Full** user; JSON key at
  `~/.config/claude-seo/service_account.json` (chmod 600).
- **Config:** `~/.config/claude-seo/google-api.json` (has `service_account_path`
  + `default_property`). Tier check:
  `~/.claude/skills/seo/.venv/bin/python ~/.claude/skills/seo/scripts/google_auth.py --check`
- Scope is read-only (`webmasters.readonly`).

### Pull / re-measure GSC data (reproducible)

Use the venv python. This is how the baseline was built and how to re-measure:

```python
# ~/.claude/skills/seo/.venv/bin/python
import datetime as dt
from google.oauth2 import service_account
from googleapiclient.discovery import build
SA="/Users/brunovieira/.config/claude-seo/service_account.json"
PROP="sc-domain:wbdigitalsolutions.com"
creds=service_account.Credentials.from_service_account_file(SA, scopes=["https://www.googleapis.com/auth/webmasters.readonly"])
svc=build("searchconsole","v1",credentials=creds,cache_discovery=False)
end=dt.date.today(); start=end-dt.timedelta(days=90)   # or 485 for ~16mo (max retention)
def q(dims,limit=1000,filters=None):
    body={"startDate":str(start),"endDate":str(end),"dimensions":dims,"rowLimit":limit}
    if filters: body["dimensionFilterGroups"]=filters
    return svc.searchanalytics().query(siteUrl=PROP,body=body).execute().get("rows",[])
# all queries: q(["query"]) ; pages: q(["page"]) ; devices: q(["device"]) ; countries: q(["country"])
# position of ONE keyword: filter query == "<kw>" and read row["position"] (absent => not ranking)
```

To record a specific keyword's current position, query with a `query` equals
filter; if no row returns, it is **not ranking** (0 impressions in-window).

## Schema already shipped (site code)

Structured data is generated in `src/utils/schemaHelpers.ts` + emitted by
`src/components/SchemaMarkup.tsx`, orchestrated in `src/components/PageHead.tsx`.
Shipped 2026-07-11 (commit `c6bf246`):
- **Person (founder Bruno)** on homepage + `Organization.founder ⇄
  Person.worksFor` linked by `@id`; localized `jobTitle`, `knowsAbout`, `sameAs`
  → LinkedIn/GitHub + CV subdomains.
- **CollectionPage + ItemList** on `/blog` and `/projects` indexes.

**Open schema gap (not done, flagged HIGH):** `/projects/*` case-study pages have
only BreadcrumbList — add `CreativeWork` per case (author=Bruno, about/keywords
= stack, image, url, dateCreated) for E-E-A-T + GEO citability.

## Rules when doing SEO work here

- Any user-facing string added for target keywords must cover all 4 locales
  (`en/es/it/ptbr` JSONs) — see [[english-engineering-artifacts]] and the i18n rule.
- Follow [[build-before-push]] and [[align-before-deploy]]: implement → show →
  wait for OK → full `next build` → commit/push → monitor deploy (see `deploy` skill).
- DNS/hosting context in [[domain-dns]]; the site is on Vercel, DNS on Cloudflare.
- After shipping a target-keyword page/post, re-measure in a few weeks and update
  the plan's tracking table + add a dated snapshot in `docs/seo/`.
