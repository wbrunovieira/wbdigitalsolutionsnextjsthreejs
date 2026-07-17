---
name: traffic-analytics
description: Investigate where wbdigitalsolutions.com traffic comes from and whether a spike is real humans or bots. Pull real numbers from the Vercel Web Analytics REST API (referrer, route, country, device, daily trend) with the local Vercel CLI token, and cross-check Google Search Console for the organic-search slice. Use whenever the task is analyzing site visits, a traffic increase/drop, referrers, top pages, or geography for this site.
---

# Traffic Analytics — wbdigitalsolutions.com

How to answer "where do the visits come from?" / "is this spike real?" with actual data.

## The measurement map (read first — this drives everything)

- **The main site (`www`/apex) is DNS-only -> Vercel**, NOT proxied through Cloudflare
  (`curl -sI https://www.wbdigitalsolutions.com/` shows `server: Vercel`). So **Cloudflare
  analytics does NOT see main-site traffic**, and the CF token (`~/.cf_token`) lacks the
  `analytics.read` scope anyway. Only the VPS subdomains are orange-clouded.
- **The truth for main-site traffic is Vercel Web Analytics + GA4.** Vercel is queryable
  now (below). GA4 is not yet wired (below).
- **Vercel Web Analytics is client-side** (a JS beacon from `@vercel/analytics`). It counts
  only clients that execute JS -> real browsers or headless/JS bots. Plain `curl`, CI
  fetches, and non-JS crawlers do NOT appear here (good: our own prod checks don't inflate it).
- This Vercel project (`wbdigitalsolutionsnextjsthreejs`) also serves the **CV subdomains**
  (`brunodev`/`brunov`) via host rewrites, so their homepage hits report as `requestPath: /`.
- **The domain is YEARS old**; only the SEO program is new (started 2026-07-11). Low GSC
  numbers mean "no prior SEO", NOT a new domain. Do not call the site "new".

## Vercel Web Analytics API (the main tool — we already have full access)

Public REST API, same data as the dashboard. The **Vercel CLI token already works** with it
(no extra setup needed). Token lives at
`~/Library/Application Support/com.vercel.cli/auth.json`; load it, never echo it:

```bash
TK=$(python3 -c "import json,os;print(json.load(open(os.path.expanduser('~/Library/Application Support/com.vercel.cli/auth.json'))).get('token',''))")
PROJ=prj_7f0DQePgCQqWyR4e9D9eT9BERgqK   # wbdigitalsolutionsnextjsthreejs (personal scope -> no teamId)
API=https://api.vercel.com/v1/query/web-analytics/visits/aggregate
```

Endpoints: `visits/aggregate` (rows grouped by a dimension), `visits/count` (one total),
`events/aggregate`, `events/count`. Auth header `Authorization: Bearer $TK`.
Params (pass with `curl --get ... --data-urlencode`): `projectId`, `since=YYYY-MM-DD`,
`until=YYYY-MM-DD`, `by=<dimension>`, `limit`, `filter` (OData, e.g.
`requestPath eq '/pricing' and country eq 'US'`). Omit `teamId` (personal account).
Dimensions: `day`, `requestPath`, `route`, `country`, `referrerHostname`, `deviceType`,
`browserName`, `utmSource`/`utmCampaign`/etc.

```bash
# Daily trend (spot the spike)
curl -s --get "$API" -H "Authorization: Bearer $TK" \
  --data-urlencode "projectId=$PROJ" --data-urlencode "since=2026-07-05" \
  --data-urlencode "until=2026-07-17" --data-urlencode "by=day"

# WHERE FROM: referrer (empty referrerHostname = direct / app-stripped / bots)
curl -s --get "$API" -H "Authorization: Bearer $TK" \
  --data-urlencode "projectId=$PROJ" --data-urlencode "since=2026-07-10" \
  --data-urlencode "until=2026-07-17" --data-urlencode "by=referrerHostname" --data-urlencode "limit=15"
```
Swap `by=` for `requestPath`, `country`, `deviceType` to characterize the traffic.
Reporting window is bounded by the plan (Hobby is short); a leading `0` day is usually the
window edge, not a real zero. `--get` loops in zsh break on `\` line-continuations — run one
`curl` per line, not a `for` loop.

## Bot-vs-human heuristic (this site)

Real audience for a pt-BR agency: **Brazil/Latam-heavy** (Italy too, for the CV), more
**mobile**, spread across pages, with app/social/search referrers.
Bot / automated signature: **no referrer + US-datacenter-heavy + desktop + homepage-only
(`/`) + steady modest volume**. Vercel filters known bots, but headless/JS bots slip through.
When most traffic is US + desktop + `/` + empty referrer, treat the "increase" as largely
automated noise, not proof SEO is working. Corroborate real humans with the BR slice + named
referrers (google/linkedin/bing) + GSC.

## Google Search Console (organic-search slice only)

Auth is a **Google service account** (`claude-seo@claude-seo-502119.iam.gserviceaccount.com`)
already granted on `sc-domain:wbdigitalsolutions.com`. Credential + config files (pre-existing,
outside the repo):
- `~/.config/claude-seo/service_account.json` — the service-account key.
- `~/.config/claude-seo/google-api.json` — points to the key + `"default_property": "sc-domain:wbdigitalsolutions.com"`.

One-time setup done here: `pip3 install --user google-api-python-client` (the `gsc_query.py`
script needs it; the REST-based `google_auth.py` check works without it). Verify access first:
```bash
python3 ~/.claude/skills/seo/scripts/google_auth.py --check   # expect [OK] Search Console + Indexing
```
Then query (script at `~/.claude/skills/seo/scripts/gsc_query.py`):
```bash
python3 ~/.claude/skills/seo/scripts/gsc_query.py query --dimensions date --days 18
python3 ~/.claude/skills/seo/scripts/gsc_query.py query --dimensions query --days 7 --limit 15
```
GSC only shows Google organic. If Vercel spiked but GSC is flat, the traffic is NOT organic.
(GA4 in the same config would add channel/UTM depth but is not wired yet — see below.)

## GA4 (not wired yet — the one gap)

The site runs GA4 (`G-PZ3WX1KF35`) but the numeric **property ID is not configured**, so the
GA4 Data API is unavailable. GA4 would add channel grouping + UTM depth beyond Vercel's
referrer. To enable: Bruno copies the GA4 Property ID (Admin -> Property Settings) and adds
`claude-seo@claude-seo-502119.iam.gserviceaccount.com` as a **Viewer** on the property, then
add `"ga4_property_id"` to `~/.config/claude-seo/google-api.json`. Not required for referrer/
route/country/device analysis — Vercel's API already covers those.

## The investigation runbook

1. Vercel `by=day` over ~2 weeks -> quantify and date the change.
2. Vercel `by=referrerHostname` -> the headline "where from".
3. Vercel `by=requestPath` + `by=country` + `by=deviceType` -> characterize (apply the
   bot heuristic).
4. GSC daily -> is any of it organic search?
5. Synthesize: real audience vs bots vs a referral/share, with numbers.
