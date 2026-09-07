#!/usr/bin/env node
/**
 * CLAUDE.md rule 1: max 200 lines per page/component/logic file.
 *
 * This is a ratchet, not a big-bang gate: files already over the limit are
 * listed in legacy-file-lengths.json with the length they had when the gate
 * was introduced. They may shrink (and the baseline is then re-tightened with
 * `--update`), never grow, and any NEW file over the limit fails the build.
 *
 * Usage:
 *   node scripts/file-length-check.mjs            # check (exit 1 on violation)
 *   node scripts/file-length-check.mjs --update   # rewrite the baseline
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const LIMIT = 200;
const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const BASELINE_FILE = join(ROOT, 'scripts', 'legacy-file-lengths.json');

// Pure data/content files are Records, not complexity (CLAUDE.md rule 1).
const EXEMPT = [/^src\/data\//, /^src\/locales\//, /^src\/content\//, /\.d\.ts$/];

const walk = (dir, files = []) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.tsx?$/.test(entry.name)) files.push(full);
  }
  return files;
};

const lengths = new Map();
for (const file of walk(SRC)) {
  const path = relative(ROOT, file);
  if (EXEMPT.some((pattern) => pattern.test(path))) continue;
  lengths.set(path, readFileSync(file, 'utf8').split('\n').length);
}

const oversized = [...lengths.entries()].filter(([, lines]) => lines > LIMIT).sort((a, b) => b[1] - a[1]);

if (process.argv.includes('--update')) {
  writeFileSync(BASELINE_FILE, `${JSON.stringify(Object.fromEntries(oversized), null, 2)}\n`);
  console.log(`Baseline updated: ${oversized.length} files still over ${LIMIT} lines.`);
  process.exit(0);
}

const baseline = JSON.parse(readFileSync(BASELINE_FILE, 'utf8'));
const added = [];
const grown = [];

for (const [path, lines] of oversized) {
  if (!(path in baseline)) added.push(`${path} (${lines} lines)`);
  else if (lines > baseline[path]) grown.push(`${path} (${baseline[path]} -> ${lines} lines)`);
}

const improved = Object.entries(baseline).filter(([path]) => (lengths.get(path) ?? 0) <= LIMIT);

if (improved.length) {
  console.log(`${improved.length} legacy file(s) now within the limit; run --update to tighten the baseline:`);
  improved.forEach(([path]) => console.log(`  - ${path}`));
}

if (added.length || grown.length) {
  if (added.length) {
    console.error(`\nNew files over the ${LIMIT}-line limit (split by responsibility):`);
    added.forEach((entry) => console.error(`  - ${entry}`));
  }
  if (grown.length) {
    console.error(`\nLegacy files that grew instead of shrinking:`);
    grown.forEach((entry) => console.error(`  - ${entry}`));
  }
  process.exit(1);
}

console.log(`File length OK: ${lengths.size} files checked, ${oversized.length} known legacy files over ${LIMIT} lines.`);
