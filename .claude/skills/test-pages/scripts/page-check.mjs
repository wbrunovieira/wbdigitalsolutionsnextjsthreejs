/**
 * Page layout tester (Playwright): renders a page at a given viewport/engine,
 * measures horizontal overflow (the classic "mobile squeezed to a column"
 * symptom) listing the offending elements, and saves a screenshot.
 *
 * Usage:
 *   node page-check.mjs <url> [options]
 * Options:
 *   --engine=chromium|webkit   (default chromium; webkit ≈ Safari)
 *   --device="iPhone 14"       (Playwright device descriptor; overrides size)
 *   --width=390 --height=844   (viewport when no --device)
 *   --full                     (full-page screenshot instead of viewport)
 *   --clip=TOP,HEIGHT          (crop a vertical band of the full page, CSS px)
 *   --wait=1500                (settle time in ms for framer animations)
 *   --out=shot.png             (screenshot path; default page-check.png)
 */

import { chromium, webkit, devices } from "playwright";

const args = Object.fromEntries(
  process.argv.slice(3).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);
const url = process.argv[2];
if (!url) {
  console.error("uso: node page-check.mjs <url> [--engine=webkit] [--device=\"iPhone 14\"] [--width=390 --height=844] [--full] [--clip=TOP,HEIGHT] [--wait=1500] [--out=shot.png]");
  process.exit(1);
}

const engine = args.engine === "webkit" ? webkit : chromium;
const ctx = args.device
  ? { ...devices[args.device] }
  : { viewport: { width: Number(args.width ?? 390), height: Number(args.height ?? 844) }, deviceScaleFactor: 2 };
const out = args.out ?? "page-check.png";

const browser = await engine.launch();
const page = await browser.newPage(ctx);
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(Number(args.wait ?? 1500));

// ── Horizontal-overflow report: viewport vs scrollWidth + offending elements
const report = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const sw = document.documentElement.scrollWidth;
  const bad = [];
  for (const el of document.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.right > vw + 2 || r.left < -2) {
      bad.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 90),
        left: Math.round(r.left),
        right: Math.round(r.right),
        w: Math.round(r.width),
        text: (el.textContent ?? "").trim().slice(0, 40),
      });
    }
  }
  bad.sort((a, b) => b.w - a.w);
  return { vw, sw, count: bad.length, top: bad.slice(0, 20) };
});

const engineName = args.engine === "webkit" ? "WEBKIT" : "CHROMIUM";
console.log(`${engineName} viewport=${report.vw}px scrollWidth=${report.sw}px overflow=${report.sw - report.vw}px offenders=${report.count}`);
for (const b of report.top) console.log(`  [${b.w}px] <${b.tag}> L${b.left} R${b.right} cls="${b.cls}" txt="${b.text}"`);
if (report.sw - report.vw > 2) console.log("⚠️  OVERFLOW HORIZONTAL detectado — investigue os offenders acima.");

// ── Screenshot (viewport, full page, or a vertical clip of the full page)
if (args.clip) {
  const [top, height] = String(args.clip).split(",").map(Number);
  await page.screenshot({ path: out, fullPage: true, clip: { x: 0, y: top, width: report.vw, height } });
} else {
  await page.screenshot({ path: out, fullPage: Boolean(args.full) });
}
console.log("screenshot:", out);

await browser.close();
