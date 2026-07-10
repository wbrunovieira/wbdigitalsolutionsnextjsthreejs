# Plan: contact-form lead-source attribution

Status: PLANNED (not started) · Created 2026-07-10 · Owner: Bruno

Goal: when someone submits the site contact form, capture and record **where the
lead came from** (referrer, UTM, landing/origin page, device, approximate city)
so Bruno can trace each contact's source — today none of that is captured.

---

## Current state (investigated 2026-07-10)

| Fact | Detail |
|---|---|
| Form component | `src/components/Contact.tsx` — collects **name, email, message** only, plus `language`, honeypot `_hp`, and a client load-timestamp `_t` (anti-bot). |
| On submit | Fires a client GA4 event `gtag('event','form_submit', …)` (only if consented + gtag present), then `POST /api/send-email`. |
| Backend | `src/pages/api/send-email.ts` — nodemailer over Gmail. Sends (1) a team notification email to `CONTACT_EMAIL`, (2) an auto-reply to the visitor. **Persists nothing** — no DB, no CRM, no log. The lead exists only in the two emails. |
| Attribution captured | **None.** No referrer, no UTM, no landing/origin page, no device, no IP/city. |
| CRM | Pipedrive exists in the stack (chat/analytics snippet in `_document.tsx`), but the **form does not push leads to it**. |

**Consequence:** a lead's origin cannot be recovered after the fact (it was never
captured, and email-only leaves no queryable record). GA4 shows only *aggregate*
acquisition (source/medium/device/city) for a period, never tied to a specific
person — GA4 must not receive PII.

---

## Proposed approach (phased)

### Phase 1 — Capture attribution client-side (quick, high value) — IMPLEMENTED 2026-07-10
`src/lib/attribution.ts` + wiring in `_app.tsx`:
- **First-touch** (`localStorage`, survives sessions, first write wins): `document.referrer`,
  the landing `pathname`, and `utm_source/medium/campaign/term/content`.
- **Session journey** (`sessionStorage`): every page the visitor entered, in order,
  with **active seconds per page** — timing pauses while the tab is hidden
  (`visibilitychange`), driven off `router.events`. Capped at the last 30 hops.
  Journey is analytics-grade, so it is recorded ONLY when analytics consent is
  granted; first-touch is kept regardless (it is about the inquiry's origin).
- `Contact.tsx` sends `attribution: getAttribution()` in the POST body (first-touch +
  journey + current page + device + a `consented` flag). Not tracked on CV routes.

### Phase 2 — Server-side geo + IP (quick)
`/api/send-email.ts` runs on a Vercel function, so the proxy injects geo headers:
- Read `x-vercel-ip-city`, `x-vercel-ip-country`, `x-vercel-ip-country-region`,
  and the client IP from `x-forwarded-for`.
- Merge with the client-sent attribution into one `attribution` object.

### Phase 3 — Surface it (quick)
- Append the attribution block to the **team notification email** (source, UTM,
  landing + current page, device, city/country). Immediate win: every future lead
  email shows where it came from, zero new infra.

### Phase 4 — Persist / CRM (medium, optional)
For queryable leads (not just an inbox), pick one:
- **Pipedrive** (already in the stack) — push the lead + attribution as a
  Person/Lead/Deal via its API (needs an API token + a small server call). Best if
  Pipedrive is already the sales CRM.
- **Lightweight store** — Vercel KV / a Google Sheet / a Neon table appended per
  submission. Simpler, no CRM coupling.

---

## Decisions to make first
- **LGPD/consent posture:** referrer/UTM/landing page are defensible as needed to
  handle the contact request (legitimate interest); **city/IP is more sensitive** —
  decide whether to gate the geo capture behind analytics consent
  (`CookieConsent` prefs) or drop it. Whatever ships must be consent-aware.
- **First-touch vs last-touch** attribution (recommend storing both; report
  first-touch as the "source").
- **Where leads should live** (Phase 4): Pipedrive vs a simple store — depends on
  whether Bruno works leads in Pipedrive today.

## Acceptance
- A test submission's notification email shows: source/UTM, landing + current page,
  device, and city/country.
- (If Phase 4) the lead + attribution appears in the chosen store/CRM.
- No PII sent to GA4; geo capture respects consent.

## Effort
Phases 1-3: small (one helper + a few lines in Contact.tsx + send-email.ts).
Phase 4: medium, depends on the CRM/store choice.

## Notes
- Related: the "2 off-domain analytics visits" Bruno saw were self-inflicted
  Lighthouse/Playwright runs against a raw `*.vercel.app` deploy URL during a perf
  audit — not a form/attribution issue.
- Also see the parked memory `form-lead-attribution-todo`.
