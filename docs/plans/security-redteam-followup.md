# Plan: security red-team follow-up (round 2)

Status: PLANNED (not started) · Created 2026-07-14 · Owner: Bruno

After the 9-step remediation (`security-remediation.md`, all shipped), a 3-agent
adversarial red-team hit the hardened production site. **The main site held under
direct attack** (headers+HSTS on cached pages, XFF spoof, card-contact token,
image-optimizer SSRF/DoS, body-size cap, CORS, no secret leakage, no source maps,
no subdomain takeover). But it found new, real issues. This plan covers ONLY the
items fixable **in this repo**. External items (chatbot backend, `card.` project,
DNS) are listed at the bottom and tracked elsewhere.

---

## Working rules for every step (same as round 1)

- Build before push: stop `pnpm dev`, run `node_modules/.bin/next build` (tsc alone
  misses ESLint). Never build while dev is live.
- Run `pnpm test` (vitest) — keep the suite green; add tests for new logic.
- No `eslint-disable`. Align before deploy: implement → show Bruno → wait for OK →
  commit/push → verify in prod → next. Engineering artifacts in English; any
  user-facing string covers all 4 locales.
- Production verification is part of "done". Prod curl needs a browser UA +
  `--compressed` (default UA is bot-blocked).
- Commit trailer: `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

---

## Step 1 — [HIGH] Kill the email amplification / spam relay

**Problem (two red-teams converged):** the email endpoints send an auto-reply to the
**attacker-controlled `email`** in the body, and the bot checks are bypassable:
- `newsletter.ts` has **no honeypot and no timing check** at all.
- `send-email.ts` checks are **omittable**: `_hp` only acts if present (omit it), and
  the timing gate `if (_t && typeof _t === 'number' && ...)` is **skipped entirely
  when `_t` is absent**.
- Endpoints accept `application/x-www-form-urlencoded` (a CORS "simple request"), so
  an auto-submitting `<form>` on any site can POST cross-origin (CSRF) — there is no
  `Origin`/`Referer` check.

Result: a crafted `{name,email,message}` (no `_hp`/`_t`) makes Bruno's Gmail send
WB-branded mail to any victim → Gmail quota exhaustion / account suspension / domain
reputation damage. The in-memory rate limit does **not** stop it (see Step 3).

**Change (primary → defense-in-depth):**
1. **Origin/Referer allowlist check** (primary CSRF defense, does not depend on
   client-sent fields). New `src/lib/originCheck.ts`: on POST, if an `Origin` (or
   fall back to `Referer`) is present, require it to be in an allowlist
   (`www.wbdigitalsolutions.com`, `wbdigitalsolutions.com`, the CV subdomains, and
   localhost in dev); reject cross-site with `403`. Wire into `send-email.ts` and
   `newsletter.ts`. (card-contact already has a strict CORS allowlist + token.)
2. **Shared bot-guard helper** `src/lib/formGuard.ts` combining honeypot + timing,
   with the timing check made **non-omittable** (reject/soft-200 when `_t` is absent
   or non-numeric, not skip). Apply to `send-email`, `newsletter`, `card-contact`
   (Step 4 consolidation).
3. **Coordinate the clients:** confirm each form actually sends `_hp` + `_t`
   (`Contact.tsx` does; verify the newsletter form + card client). If a client omits
   them, add them before enforcing, or the Origin check alone gates that endpoint.
4. **Decision for Bruno:** stronger option for the auto-reply (attacker-controlled
   recipient) = double-opt-in or a Cloudflare Turnstile token before the auto-reply.
   Recommend deferring unless abuse is seen; the Origin check + non-omittable bot
   checks + rate limit already close the practical vector.

**Files:** `src/lib/originCheck.ts` (new), `src/lib/formGuard.ts` (new),
`src/pages/api/send-email.ts`, `src/pages/api/newsletter.ts`,
`src/pages/api/card-contact.ts`, maybe the newsletter form component; tests.

**Prod verification:** cross-origin POST (spoofed `Origin: https://evil.example`) →
`403`. Same-origin form still works (real submit 200). Missing-`_t` POST → rejected/
soft-success without sending. Honeypot probe on newsletter now blocks. Zero real
emails during testing (use honeypot / invalid-email paths).

**Rollback:** additive — revert the two lib files + endpoint wiring.

**Shipped 2026-07-14** (commit 3871e55): originCheck + formGuard libs, wired into
send-email + newsletter; newsletter.tsx now sends `_hp`+`_t`; card-contact untouched.
54 tests pass. **Prod curl-verification was BLOCKED**: Vercel's Attack Challenge Mode
(`x-vercel-mitigated: challenge`) was challenging ALL traffic (GET+POST) — almost
certainly auto-triggered by the red-team + verification traffic volume. Real browsers
pass the challenge transparently; the logic is covered by the test suite. Outstanding:
(a) Bruno browser smoke-test of the real contact + newsletter forms, (b) confirm the
challenge subsided and real Googlebot still crawls 200 (Search Console), (c) if it
persists, check Vercel → Firewall → Attack Challenge Mode.

---

## Step 2 — [MED] Escape HTML in the newsletter notification email

**Problem:** `newsletter.ts` interpolates `${name}`, `${company}`, `${email}` **raw**
into the admin notification HTML (all 4 locale templates). `card-contact` (`esc`) and
`send-email` (`escapeHtml` in `contactEmail.js`) both escape — newsletter is the
outlier. `email` passes the regex but still permits `<b>x</b>@evil.co`. Allows
link/image/tracking-pixel injection into a trusted internal email (not full XSS —
providers strip scripts — but content spoofing / phishing).

**Change:** reuse the sibling `escapeHtml()` on `name`/`company`/`email` before
interpolation in both the HTML and plain-text builders.

**Files:** `src/pages/api/newsletter.ts`.

**Prod verification:** a submit with markup in `name` (to a test address) arrives
with the markup escaped as text. Grep confirms no raw interpolation remains.

**Rollback:** revert.

---

## Step 3 — [MED] Rate limiting that survives multiple instances

**Problem (quantified by red-team):** the in-memory limiter is per warm instance. 8
concurrent POSTs landed on **7 distinct Fluid Compute instances → 0 blocks**. The
effective global limit is `5 × N instances`, not 5. It only stops serial bursts
pinned to one instance.

**Change — decision for Bruno (pick one):**
- **A (recommended, no code):** Vercel Firewall/WAF rate-limit rule on
  `/api/send-email|newsletter|card-contact`, applied at the edge (inherently
  cross-instance). Configured in the Vercel dashboard by Bruno; may need a paid tier.
- **B (code):** shared store — Upstash Redis or Vercel KV — behind the existing
  `rateLimit()` interface, for a true global limit. Adds a managed dependency + env
  vars.
- Keep the in-memory limiter as a cheap first layer regardless.

**Files:** none (A) or `src/lib/rateLimit.ts` + a store client + env (B).

**Prod verification:** 8 concurrent POSTs (honeypot path) → 429 after the limit
regardless of instance spread.

**Rollback:** A = remove the WAF rule; B = revert to in-memory.

**Shipped 2026-07-15 (Option A — Vercel WAF, no code):** Firewall custom rule
"Rate limit email endpoints" — `Request Path Starts with /api/`, Rate Limit Fixed
Window 10 req / 60s keyed by **IP Address**, action **Deny (403)**. Runs at the edge
so it is cross-instance (closes the red-team's Fluid-Compute bypass). Verified in
prod: a 16-request burst gave `200x5 → 429x5 (app in-memory) → 403x6 (WAF edge)`;
the 403 body is Vercel's edge deny (`{"error":{"code":"403"...}}`), i.e. it never
reached the function. NOTE: WAF rate limiting worked on the **Hobby** plan (no Pro
upgrade needed). Two gotchas hit while configuring: the 3 path conditions must be
OR not AND (a path can't equal all three — we switched to `Starts with /api/`), and
the Rate Limit key must be `IP Address`, not the default `API controlled` (SDK-only).
The in-memory limiter stays as a tighter per-instance first layer.

---

## Step 4 — [LOW] Consolidate the 3 endpoints' bot defenses

**Problem:** divergent defenses — `card-contact` (token + honeypot + timing),
`send-email` (omittable honeypot + timing), `newsletter` (none). Inconsistent and
error-prone.

**Change:** route all three through the shared `formGuard` (Step 1) + `rateLimit` +
`originCheck` so protection is identical and non-omittable. Likely folded into Step 1;
kept separate here for tracking.

**Files:** the 3 API routes.

**Prod verification:** all three reject the same bot/CSRF probes identically.

**Rollback:** revert.

---

## Step 5 — [LOW] HSTS `includeSubDomains` + `preload`

**Problem:** prod returns `strict-transport-security: max-age=63072000` only (no
`includeSubDomains`/`preload`). HSTS currently comes from the Vercel platform, not the
repo.

**Change:** set HSTS explicitly in `vercel.json` headers:
`max-age=63072000; includeSubDomains; preload`. **Precondition:** confirm ALL
subdomains are HTTPS-only before adding `includeSubDomains` (www, brunodev, brunov,
card, chatbot) — otherwise it can break a non-HTTPS subdomain. Do NOT submit to the
preload list until verified stable.

**Files:** `vercel.json`.

**Prod verification:** `curl -I` shows the full HSTS on www + subdomains; all
subdomains still load over HTTPS.

**Rollback:** revert the header (note: `preload` is sticky once submitted to the
browser preload list — so hold off on actual preload-list submission).

---

## Step 6 — [LOW] Add `/.well-known/security.txt`

**Problem:** 404 on all hosts. Best-practice for responsible disclosure.

**Change:** add `public/.well-known/security.txt` (Contact, Expires, Preferred-
Languages, Canonical). Keep `Expires` ~1 year out.

**Files:** `public/.well-known/security.txt` (+ sitemap parity not needed).

**Prod verification:** `GET /.well-known/security.txt` → 200 with valid fields.

**Rollback:** delete the file.

---

## Step 7 — [ROADMAP] CSP nonce migration (drop `unsafe-inline`)

**Problem:** `script-src` keeps `unsafe-inline` + `unsafe-eval` (required today by
GTM/Pixel/Clarity). Red-team rated the CSP ~2/10 against XSS: any future injection
point becomes full XSS. Latent — no attacker-controlled value reaches an HTML sink
today (verified), so this is NOT urgent.

**Change (large, separate effort):** move to a per-request nonce `script-src` via Next
middleware, migrate inline analytics bootstraps to nonce'd scripts, then drop
`unsafe-inline`. `unsafe-eval` is harder to shed while GTM is present. This is a
project, not a step — scope it on its own when there's appetite.

**Files:** middleware + `_app.tsx`/`_document.tsx` + `vercel.json`. Big.

**Prod verification:** full console + analytics regression across all pages.

---

## Progress tracker (this repo)

| Step | Sev | Status | Commit | Prod-verified |
|---|---|---|---|---|
| 1. Kill email amplification + CSRF | HIGH | ✅ | 3871e55 | ✅ Bruno smoke-test: form sent + email received |
| 2. Escape newsletter email HTML | MED | ✅ | (this push) | ✅ test-covered (server-side) |
| 3. Cross-instance rate limiting | MED | ✅ | Vercel WAF (no code) | ✅ 403 at edge after 10/60s |
| 4. Consolidate bot defenses | LOW | ☐ | — | ☐ |
| 5. HSTS includeSubDomains/preload | LOW | ✅ | (this push) | ⏳ verify header after deploy |
| 6. security.txt | LOW | ✅ | (this push) | ⏳ verify 200 after deploy |
| 7. CSP nonce migration | ROADMAP | ☐ | — | ☐ |

---

## OUT OF SCOPE for this repo (tracked so nothing is lost)

These are NOT fixable here — recorded for coordination:

- **[HIGH] Chatbot backend** (`chatbot.wbdigitalsolutions.com`, repo
  `chatbotwbdigitalsolutions2MVP`, Contabo VPS `45.90.123.190`): no auth on `/chat`
  (LLM token-burn / cost DoS), no spend cap, CORS reflecting any Origin (likely
  `ansible/templates/nginx-chatbot.conf.j2`), public `/docs`+`/openapi.json`,
  unauth `/usage-report`, origin not behind Cloudflare. **Biggest financial risk.**
  Handed off to that repo's own session.
- **[MED] `card.wbdigitalsolutions.com`**: separate Vercel project, missing all
  security headers (only HSTS). Add the same `vercel.json` header block there.
- **[LOW] DNS (Cloudflare):** narrow the `*.wbdigitalsolutions.com` wildcard to
  hosts actually in use; tighten DMARC from `p=quarantine` to `p=reject` once all
  senders (Google Workspace + SES) pass DKIM/SPF alignment.
- **[INFO] Coordination:** the Origin allowlist (Step 1) and any chatbot CORS fix
  must agree on the same origin set (`www` + CV subdomains).
