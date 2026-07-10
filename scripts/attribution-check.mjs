#!/usr/bin/env node
/**
 * Contact-form lead-attribution check (Playwright).
 *
 * Drives a real browser through a multi-page journey (home -> websites -> ai ->
 * contact) with dwell time on each, then submits the form while INTERCEPTING
 * /api/send-email (no real email is sent) and asserts the captured POST body:
 *   - with analytics consent: first-touch (referrer/landing/UTM) + a journey of
 *     several pages each with active seconds + currentPage + device;
 *   - without consent: journey is empty but first-touch is still captured.
 *
 * Usage: node scripts/attribution-check.mjs [--base=http://localhost:3001]
 * Exit: 0 = all assertions passed, 1 = a failure.
 */
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
function loadPlaywright() {
  if (process.env.PW_PATH) return require(path.join(process.env.PW_PATH, 'playwright'));
  try {
    return require('playwright');
  } catch {
    return require(path.resolve('.claude/skills/test-pages/node_modules/playwright'));
  }
}
const pw = loadPlaywright();

const BASE = (process.argv.find((a) => a.startsWith('--base=')) || '--base=http://localhost:3001').split('=')[1];

async function submitJourney(consent) {
  const browser = await pw.chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  // Seed the consent choice so the banner never blocks clicks; analytics=consent
  // controls whether the journey is recorded.
  await ctx.addInitScript((c) => {
    try {
      localStorage.setItem('wb-consent-v2', JSON.stringify({ analytics: c, marketing: c, ts: Date.now() }));
    } catch {
      /* ignore */
    }
  }, consent);
  const page = await ctx.newPage();

  let body = null;
  await page.route('**/api/send-email', (route) => {
    body = route.request().postDataJSON();
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, message: 'ok' }) });
  });

  // Land with a referrer + UTM so first-touch has something to capture.
  await page.goto(`${BASE}/?utm_source=newsletter&utm_medium=email`, {
    waitUntil: 'domcontentloaded',
    referer: 'https://www.google.com/',
    timeout: 60000,
  });
  await page.waitForTimeout(2600);

  // Client-side (SPA) navigation so router.events fires and dwell commits.
  // /contact dwells > 3s: the form rejects submissions faster than that (anti-bot).
  for (const [href, dwell] of [['/websites', 2600], ['/ai', 2200], ['/contact', 3600]]) {
    await page.locator(`a[href="${href}"]`).first().click({ timeout: 15000 }).catch(() => {});
    await page.waitForURL(`**${href}`, { timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(dwell);
  }

  await page.locator('input[name="name"]').first().fill('Playwright Tester');
  await page.locator('input[name="email"]').first().fill('attribution-test@example.com');
  await page.locator('textarea').first().fill('End-to-end test of the lead attribution capture.');
  await page.locator('button[type="submit"]').first().click({ timeout: 10000 }).catch(() => {});
  await page.waitForResponse('**/api/send-email', { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(500);

  await browser.close();
  return body;
}

const failures = [];
const check = (label, cond, detail) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}`);
  if (!cond) {
    failures.push(label);
    if (detail !== undefined) console.log('      got:', JSON.stringify(detail).slice(0, 200));
  }
};

console.log('=== A) with analytics consent ===');
const withConsent = await submitJourney(true);
const a = withConsent && withConsent.attribution;
check('form POST captured', !!a, withConsent);
if (a) {
  check('firstTouch.landing = /', a.firstTouch && a.firstTouch.landing === '/', a.firstTouch);
  check('firstTouch.utm.utm_source = newsletter', a.firstTouch && a.firstTouch.utm && a.firstTouch.utm.utm_source === 'newsletter', a.firstTouch);
  check('firstTouch.referrer has google', !!(a.firstTouch && /google/.test(a.firstTouch.referrer || '')), a.firstTouch && a.firstTouch.referrer);
  check('journey has >= 3 pages', Array.isArray(a.journey) && a.journey.length >= 3, a.journey);
  check('journey records active seconds (some > 0)', Array.isArray(a.journey) && a.journey.some((h) => h.s > 0), a.journey);
  check('journey visited /websites and /ai', Array.isArray(a.journey) && ['/websites', '/ai'].every((p) => a.journey.some((h) => h.p === p)), a.journey);
  check('currentPage = /contact', a.currentPage === '/contact', a.currentPage);
  check('device = desktop', a.device === 'desktop', a.device);
  check('consented = true', a.consented === true, a.consented);
  console.log('   journey:', JSON.stringify(a.journey));
}

console.log('\n=== B) without analytics consent ===');
const noConsent = await submitJourney(false);
const b = noConsent && noConsent.attribution;
check('form POST captured', !!b, noConsent);
if (b) {
  check('journey is empty (gated by consent)', Array.isArray(b.journey) && b.journey.length === 0, b.journey);
  check('first-touch still captured', !!(b.firstTouch && b.firstTouch.landing === '/'), b.firstTouch);
  check('consented = false', b.consented === false, b.consented);
}

console.log(failures.length ? `\n${failures.length} FAILURE(S)` : '\n✅ All attribution checks passed.');
process.exit(failures.length ? 1 : 0);
