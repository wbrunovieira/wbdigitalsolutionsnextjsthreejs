#!/usr/bin/env node
/**
 * CV subdomain locale-URL stability check (Playwright).
 *
 * Built-in Next i18n treats the CV subdomains' locale paths (/en /pt /it /es)
 * as locale prefixes and, on the subdomain host-rewrite, the client router
 * reconciles them back to '/', erasing the locale from the URL after load
 * ("fills then erases"). This drives a headless browser to every CV locale URL
 * and asserts the URL STAYS on its locale and the visible content matches.
 *
 * Usage: node scripts/cv-locale-url-check.mjs
 *        PW_PATH=/abs/node_modules/playwright ... (override playwright location)
 * Exit: 0 = every locale URL stable & correct, 1 = at least one failure.
 */
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
// CI installs `playwright` as a devDependency (pnpm), so it resolves normally.
// Local runs fall back to the test-pages skill's copy.
function loadPlaywright() {
  if (process.env.PW_PATH) return require(path.join(process.env.PW_PATH, 'playwright'));
  try {
    return require('playwright');
  } catch {
    return require(path.resolve('.claude/skills/test-pages/node_modules/playwright'));
  }
}
const PW = loadPlaywright();

const DEV = 'https://brunodev.wbdigitalsolutions.com';
const VEN = 'https://brunov.wbdigitalsolutions.com';

// path -> { lang marker expected somewhere in the first rendered heading/paragraph }
const CASES = [
  // brunov: root = en, locale variants /pt /it /es
  { url: VEN + '/', expectPath: '/', lang: 'en', word: 'Sales' },
  { url: VEN + '/pt', expectPath: '/pt', lang: 'pt-BR', word: 'Vendas' },
  { url: VEN + '/it', expectPath: '/it', lang: 'it', word: 'Vendite' },
  { url: VEN + '/es', expectPath: '/es', lang: 'es', word: 'Ventas' },
  // brunodev: root = en, locale variants /pt /it /es
  { url: DEV + '/', expectPath: '/', lang: 'en', word: 'Engineer' },
  { url: DEV + '/pt', expectPath: '/pt', lang: 'pt-BR', word: 'Engenheiro' },
  { url: DEV + '/it', expectPath: '/it', lang: 'it', word: 'Ingegnere' },
  { url: DEV + '/es', expectPath: '/es', lang: 'es', word: 'Ingeniero' },
];

const browser = await PW.chromium.launch();
const failures = [];

for (const c of CASES) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  try {
    await page.goto(c.url, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(3500); // let any client reconciliation settle
    const finalPath = new URL(page.url()).pathname.replace(/\/$/, '') || '/';
    const title = await page.title();
    const problems = [];
    if (finalPath !== c.expectPath) problems.push(`URL erased: expected ${c.expectPath}, got ${finalPath}`);
    if (!title.includes(c.word)) problems.push(`content mismatch: "${c.word}" not in title "${title}"`);
    const status = problems.length ? '✗' : '✓';
    console.log(`${status}  ${c.url.replace('https://', '')}  ->  ${finalPath}  [${title.slice(0, 42)}]`);
    if (problems.length) { console.log('      ' + problems.join('; ')); failures.push({ ...c, problems }); }
  } catch (err) {
    console.log(`✗  ${c.url.replace('https://', '')}  LOAD ERROR: ${String(err.message).split('\n')[0]}`);
    failures.push({ ...c, problems: ['load error'] });
  }
  await ctx.close();
}

await browser.close();
console.log(failures.length ? `\n${failures.length} FAILURE(S)` : `\nAll ${CASES.length} CV locale URLs stable and correct.`);
process.exit(failures.length ? 1 : 0);
