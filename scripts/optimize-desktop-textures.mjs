import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import sharp from 'sharp';

const TEXTURES_DIR = 'public/models/desktop/textures';

// Only re-compress base color JPEG textures (safe - just lossy compression of color data)
// Leave PNG, normal maps, metallic-roughness, emissive, occlusion unchanged
const isBaseColorJpeg = (filename) =>
  filename.endsWith('.jpeg') || filename.endsWith('.jpg');

const isMetadata = (filename) =>
  filename.includes('metallicRoughness') ||
  filename.includes('normal') ||
  filename.includes('emissive') ||
  filename.includes('occlusion');

async function run() {
  const files = readdirSync(TEXTURES_DIR);
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const fullPath = join(TEXTURES_DIR, file);
    const stat = statSync(fullPath);
    if (!stat.isFile()) continue;
    if (!isBaseColorJpeg(file)) continue;
    if (isMetadata(file)) continue;

    const before = stat.size;
    totalBefore += before;

    try {
      const input = readFileSync(fullPath);
      const output = await sharp(input)
        .jpeg({ quality: 72, mozjpeg: true })
        .toBuffer();

      // Only save if we actually made it smaller
      if (output.length < before) {
        writeFileSync(fullPath, output);
        totalAfter += output.length;
        const pct = (((before - output.length) / before) * 100).toFixed(1);
        console.log(`  ✓ ${file}: ${(before/1024).toFixed(0)}KB → ${(output.length/1024).toFixed(0)}KB (-${pct}%)`);
      } else {
        totalAfter += before;
        console.log(`  — ${file}: already optimal (${(before/1024).toFixed(0)}KB), skipped`);
      }
    } catch (e) {
      totalAfter += before;
      console.warn(`  ✗ ${file}: failed - ${e.message}`);
    }
  }

  const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(2);
  const pct = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1);
  console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(2)}MB → ${(totalAfter/1024/1024).toFixed(2)}MB (saved ${savedMB}MB, -${pct}%)`);
}

run();
