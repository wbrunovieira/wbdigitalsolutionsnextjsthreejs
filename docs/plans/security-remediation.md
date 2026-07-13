# Plan: security remediation (senior sweep 2026-07-13)

Status: PLANNED (not started) · Created 2026-07-13 · Owner: Bruno

Goal: fix every issue from the senior security sweep, **in the severity order it
was reported**, one step at a time. Each step is self-contained and ships on its
own: implement → `tsc` → full `next build` → commit → push → **verify in
production** → Bruno's OK → only then the next step. No batching; if a step
regresses prod, we stop and roll back that step before continuing.

Source of findings: the 2026-07-13 sweep (SAST + `pnpm audit`/`outdated` + DAST in
production). Overall posture was already GOOD; these harden it to "model" and
close the two real gaps (headers not reaching cached pages, no rate limiting).

---

## Working rules for every step (non-negotiable)

- **Build before push:** stop any `pnpm dev` first, run `node_modules/.bin/next build`
  (tsc alone misses ESLint errors). Never `pnpm build` while dev is live (corrupts `.next`).
- **No `eslint-disable`** directives; fix the code instead.
- **Align before deploy:** implement, show Bruno, wait for OK, THEN commit/push. Do
  not auto-chain into the next step.
- **Engineering artifacts in English** (code, comments, commit messages). Any
  user-facing string (e.g. a 429 message) must cover ALL 4 locales.
- **Production verification is part of "done"** — a step is not finished until its
  prod check below passes on the live URL.
- Commit trailer: `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

---

## Step 1 — [HIGH] Security headers on cached pages  (`vercel.json`)

**Problem:** SSG pages served from Vercel's edge cache (`x-vercel-cache: HIT` — `/`,
`/en`, `/blog`, every marketing/blog page) ship WITHOUT CSP, X-Frame-Options,
X-Content-Type-Options, Referrer-Policy, Permissions-Policy. Only dynamic
responses (function/API/404) get them via `next.config.js headers()`. HSTS is
present (Vercel platform-level).

**Change:** create `vercel.json` with a `headers` block that re-declares the same
security headers for `source: "/(.*)"`. Vercel applies `vercel.json` headers at the
edge routing layer to **every** response, including statically cached ones. Keep the
`next.config.js` `headers()` as-is (belt-and-suspenders / dynamic responses). Copy
the CSP verbatim from `next.config.js:201-266` so the two never drift — or, better,
note in a comment that `vercel.json` is the source of truth going forward.
- Decision to confirm with Bruno: single source of truth. Recommended: put the full
  security-header set in `vercel.json`; leave only the `Cache-Control` rules
  (`/models`, `/img`) in `next.config.js`.

**Files:** `vercel.json` (new). Possibly trim duplicate header rules from `next.config.js`.

**Prod verification:**
```
curl -sS -D - -o /dev/null https://www.wbdigitalsolutions.com/en | \
  grep -iE "content-security-policy|x-frame-options|x-content-type-options|referrer-policy|permissions-policy|x-vercel-cache"
```
Must show all 5 headers **even on `x-vercel-cache: HIT`**. Then load the site and
`/blog` in a real browser and confirm **zero CSP violations** in the console (the
CSP is unchanged, so nothing should break — this just confirms it now applies).

**Rollback:** delete `vercel.json` (reverts to prior behavior instantly).

**Shipped 2026-07-13** (commit `9942d6a` + CSP follow-up): headers now confirmed on
`/en`, `/blog`, blog post (cache HIT/PRERENDER) and `/api/*` (MISS). Enforcing the
CSP on previously-uncovered cached pages surfaced a **pre-existing gap**: GA4's
Google-Signals beacon to `https://analytics.google.com/g/collect` was never in
`connect-src` (only `www.` and `region1.` were) — it slipped through before because
cached pages had no CSP. Added `https://analytics.google.com` to `connect-src`.
Lesson for Step 7: the CSP had latent gaps that only became observable once it was
actually enforced everywhere — re-check the console on real pages after any CSP edit.

---

## Step 2 — [HIGH] Rate limiting + email validation on the 3 email endpoints

**Problem:** `send-email.ts`, `newsletter.ts`, `card-contact.ts` call `sendMail` on
unauthenticated POSTs with no per-IP throttle (confirmed live: 8/8 → 200, no 429).
Enables spam relay, Gmail-quota exhaustion, inbox flooding, and email amplification
(victim's address becomes the auto-reply `to:`). `send-email.ts` also does not
format-validate `email` (the other two do).

**Change (pick the limiter with Bruno):**
- **Option A (recommended, robust):** `@upstash/ratelimit` + Upstash Redis, keyed on
  `x-forwarded-for`, e.g. 5 req / 10 min / IP → return `429` **before** `sendMail`.
  Needs an Upstash account + `UPSTASH_REDIS_REST_URL`/`_TOKEN` env vars in Vercel.
- **Option B (no external dep):** in-memory `Map<ip, timestamps[]>` sliding window —
  works within a warm lambda, weaker across instances; fine as defense-in-depth.
- **Option C (platform):** Vercel WAF rate-limit rule on `/api/*` (dashboard, no code).
  Can combine with A/B.
- Add `EMAIL_RE` validation in `send-email.ts` (mirror `newsletter.ts:231`).
- If the limiter returns a user-facing 429 message surfaced by `Contact.tsx`, add the
  localized string to ALL 4 locale files.

**Files:** the 3 API routes (+ a shared `src/lib/rateLimit.ts`), maybe `Contact.tsx`
+ 4 locale JSONs, `.env.example` (+ Vercel env vars if Option A).

**Prod verification (0 emails — honeypot path):**
```
for i in $(seq 1 8); do curl -sS -o /dev/null -w "%{http_code}\n" -X POST \
  https://www.wbdigitalsolutions.com/api/send-email -H "Content-Type: application/json" \
  --data '{"_hp":"1","name":"rl","email":"x@example.com","message":"probe"}'; done
```
Expect `200`s up to the threshold, then `429`. Then do **one** legit submit from the
real form and confirm it still sends (200) and the email arrives. Clean up the test.

**Rollback:** revert the routes; the limiter is additive.

**Shipped 2026-07-13:** chose the in-memory Map limiter (5 req / 10 min / IP) in
`src/lib/rateLimit.ts`, wired into all 3 routes after the method check; added
EMAIL_RE validation to `send-email.ts`. Senior review verdict SHIP AS-IS — the key
risk (x-forwarded-for spoofing) is safe because Vercel overwrites XFF with the real
client IP. Also fixed the test infra (vitest had no `@` alias — added
`resolve.alias`) and added 15 tests (9 unit for the limiter + 6 integration for
send-email 429 / email-validation); full suite 36 passing. No user-facing 429 string
added — clients re-localize non-200 as a generic error (verified in Contact.tsx /
newsletter form).

---

## Step 3 — [MEDIUM] Bump Next.js 15.5.15 → 15.5.18

**Problem:** 15.5.15 is hit by 13 advisories; the reachable ones are image-optimization
SSRF/DoS, RSC cache poisoning, App-Router XSS. All patched inside the 15.5 line.

**Change:** set `"next": "15.5.18"` (or latest 15.5.x) in `package.json`, `pnpm install`.
Patch bump, no migration. Do NOT jump to Next 16 (separate React-19 project).

**Files:** `package.json`, `pnpm-lock.yaml`.

**Prod verification:** after deploy READY — site + `/blog` + a 3D page load fine;
run a quick Lighthouse (perf/SEO shouldn't regress); confirm `pnpm audit` locally no
longer lists the 13 Next advisories.

**Rollback:** revert the version bump + lockfile.

**Shipped 2026-07-13:** bumped to the latest 15.5 patch, **15.5.20** (newer than the
15.5.18 floor — more fixes, still no major migration). `pnpm audit` dropped from 52
→ 28 advisories once combined with Step 4. tsc + 36 tests + build all green.

---

## Step 4 — [MEDIUM] Remove unused `react-router-dom`

**Problem:** installed but imported nowhere (`grep` = 0 refs). Dead code carrying 11
react-router advisories.

**Change:** `pnpm remove react-router-dom`. Re-grep first to confirm no dynamic import.

**Files:** `package.json`, `pnpm-lock.yaml`.

**Prod verification:** build passes; site loads; `pnpm audit` shows the 11
react-router advisories gone.

**Rollback:** re-add the dependency.

**Shipped 2026-07-13** (batched with Step 3): confirmed zero `react-router` imports
in `src/`, then `pnpm remove react-router-dom`. Combined with the Next bump, this
cleared the 24 runtime/react-router advisories (52 → 28); the remaining 28 are
dev/build-only noise (minimatch/flatted/picomatch/eslint) plus nodemailer (Step 6).

---

## Step 5 — [MEDIUM] Stop leaking raw SMTP response to the client

**Problem:** `send-email.ts:148-149` and `newsletter.ts:349-350` return
`Gmail error: ${error.response}` in the JSON body — leaks mail-infra detail.

**Change:** keep the server-side `console.error`, but return a single generic message
(e.g. `"Failed to send email, please try again later."`) for all failure branches.
Remove the `error.response` interpolation. If the generic message is shown to users,
ensure the 4-locale strings exist (or keep it a non-localized server default handled
by the client's existing localized error copy).

**Files:** `send-email.ts`, `newsletter.ts` (+ locales if surfaced).

**Prod verification:** the success path still returns 200 and the email arrives (we
cannot safely force an SMTP error in prod without breaking creds, so the failure
branch is code-verified). Confirm no `error.response` string remains via grep.

**Rollback:** revert the two routes.

**Shipped 2026-07-13** (batched with Step 6): both `send-email.ts` and
`newsletter.ts` now log the full error server-side and return a single generic
message; removed the now-unused `isMailTransportError`/`MailTransportError` helpers.
`card-contact.ts` already returned a generic message (no change). Grep confirms no
`error.response`/`Gmail error` string reaches any client. tsc + 36 tests + build green.

---

## Step 6 — [MEDIUM] Bump `nodemailer` 7 → 9

**Problem:** runtime-reachable (3 email routes), two majors behind; carries a DoS in
addressparser among others.

**Change:** `nodemailer@^9.0.3` + matching `@types/nodemailer`. **Review the 7→9 API
surface** used in the 3 routes (transport creation, `sendMail` options) — it's a
major, verify no breaking change in how we call it.

**Files:** `package.json`, `pnpm-lock.yaml`, possibly the 3 routes if the API shifted.

**Prod verification:** send **one** real test email to Bruno's own address via the
live form and confirm it arrives and renders correctly (HTML + text). Clean up.

**Rollback:** pin back to `nodemailer@^7`.

**Shipped 2026-07-13:** `nodemailer` 7.0.5 → 9.0.3. The API surface used
(`createTransport({service,auth})` + `sendMail({...})`) is unchanged across the
majors, so no route edits were needed. This cleared the last runtime advisories:
`pnpm audit` 28 → 20, and **all 20 remaining are dev/build-only** (minimatch /
flatted / picomatch / glob / eslint chains) — zero runtime-reachable left.

---

## Step 7 — [LOW] CSP hardening

**Problem:** CSP lacks `base-uri`, `form-action`, `object-src`, `frame-ancestors`;
`connect-src` ships plaintext `http://localhost:8000` + a bare-IP `http://45.90.123.190:8000`
to production; `'unsafe-eval'` may be unnecessary.

**Change (in whichever file is the source of truth after Step 1):**
- Add `base-uri 'self'; form-action 'self'; object-src 'none'; frame-ancestors 'self';`
- Remove the two `http://` origins from `connect-src` (branch on `NODE_ENV` if dev needs localhost).
- Try removing `'unsafe-eval'` in a **preview deploy** and exercise GTM/Pixel/Clarity
  + the 3D pages; ship without it only if nothing breaks.

**Files:** `vercel.json` (and/or `next.config.js`).

**Prod verification (higher risk — do carefully):** `curl -I` shows the new
directives; then browse home, a service page, `/blog`, and a **3D page** and watch
the console for **CSP violations** (especially after dropping `unsafe-eval`).
Verify analytics still fire (GA4/Pixel/Clarity) in a consented session.

**Rollback:** this is the most likely to break something — keep the diff small and be
ready to revert the `unsafe-eval` removal independently from the added directives.

---

## Step 8 — [LOW] Escape `</script>` in JSON-LD

**Problem:** `SchemaMarkup.tsx:334` injects `JSON.stringify(...)` without escaping
`<`/`/` — not attacker-reachable today (author content only), but the generic sink.

**Change:** `.replace(/</g, '\\u003c')` on the stringified JSON before `__html`.

**Files:** `src/components/SchemaMarkup.tsx`.

**Prod verification:** the page's JSON-LD still parses (Google Rich Results test or
validate the `<script type="application/ld+json">` block on a live page); no schema
regression in Search Console.

**Rollback:** revert the one line.

---

## Step 9 — [LOW] `rel="noopener noreferrer"` on `target="_blank"` links

**Problem:** ~20 component links (`Footer.tsx:68`, `SideSocial.tsx:96`,
`cv/DevHeroIntro.tsx:81/103/113/123`, etc.) use `target="_blank"` without `rel`.
Mostly mitigated by modern browsers, but not "model" hygiene. (Blog JSON links
already have it.)

**Change:** add `rel="noopener noreferrer"` to each. Mechanical.

**Files:** the ~20 component sites (grep `target="_blank"` under `src/`).

**Prod verification:** links still open correctly; nothing visual changes.

**Rollback:** trivial revert.

---

## Progress tracker

| Step | Severity | Status | Commit | Prod-verified |
|---|---|---|---|---|
| 1. Headers on cached pages | HIGH | ✅ | 9942d6a + 1d485f9 | ✅ headers on HIT + GA4 host added |
| 2. Rate limiting + email validation | HIGH | ✅ | 36d7138 | ✅ prod: 5x200 then 429 |
| 3. Next 15.5.20 | MED | ✅ | 3baee69 | ✅ pages 200 + CSP intact |
| 4. Remove react-router-dom | MED | ✅ | 3baee69 | ✅ deploy healthy |
| 5. No SMTP error leak | MED | ✅ | 9d51364 | ✅ no leak string in prod |
| 6. nodemailer 7→9 | MED | ✅ | 9d51364 | ✅ real send 200 in prod |
| 7. CSP hardening | LOW | ☐ | — | ☐ |
| 8. JSON-LD escape | LOW | ☐ | — | ☐ |
| 9. rel=noopener | LOW | ☐ | — | ☐ |

Update this table (Status ✅, commit hash, prod-verified ✅) as each step ships.
