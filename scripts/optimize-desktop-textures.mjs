import { readFileSync, writeFileSync, readdirSync, statSync, unlinkSync } from 'fs';
import { join, extname, basename } from 'path';
import sharp from 'sharp';

const TEXTURES_DIR = 'public/models/desktop/textures';
const GLTF_PATH = 'public/models/desktop/scene.gltf';
const QUALITY = 72;

const isNonColorMap = (filename) =>
  filename.includes('metallicRoughness') ||
  filename.includes('normal') ||
  filename.includes('occlusion');

const isBaseColor = (filename) => filename.includes('_baseColor') || filename === 'Material_baseColor.jpeg' || filename === 'Material_baseColor.png';

async function run() {
  const files = readdirSync(TEXTURES_DIR);
  let totalBefore = 0;
  let totalAfter = 0;
  const renames = {}; // oldName → newName for gltf patching

  for (const file of files) {
    const fullPath = join(TEXTURES_DIR, file);
    const stat = statSync(fullPath);
    if (!stat.isFile()) continue;
    if (isNonColorMap(file)) continue;

    const ext = extname(file).toLowerCase();
    const isPng = ext === '.png';
    const isJpeg = ext === '.jpeg' || ext === '.jpg';
    if (!isPng && !isJpeg) continue;

    const before = stat.size;
    totalBefore += before;

    try {
      const input = readFileSync(fullPath);
      const output = await sharp(input)
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toBuffer();

      if (output.length < before) {
        const jpegName = file.replace(/\.(png|jpg)$/i, '.jpeg');
        const jpegPath = join(TEXTURES_DIR, jpegName);
        writeFileSync(jpegPath, output);
        totalAfter += output.length;
        const pct = (((before - output.length) / before) * 100).toFixed(1);
        console.log(`  ✓ ${file} → ${jpegName}: ${(before/1024).toFixed(0)}KB → ${(output.length/1024).toFixed(0)}KB (-${pct}%)`);
        if (isPng) {
          unlinkSync(fullPath); // remove original PNG
          renames[`textures/${file}`] = `textures/${jpegName}`;
        }
      } else {
        totalAfter += before;
        console.log(`  — ${file}: already optimal (${(before/1024).toFixed(0)}KB), skipped`);
      }
    } catch (e) {
      totalAfter += before;
      console.warn(`  ✗ ${file}: failed - ${e.message}`);
    }
  }

  // Patch scene.gltf with new filenames
  if (Object.keys(renames).length > 0) {
    let gltf = readFileSync(GLTF_PATH, 'utf8');
    for (const [oldRef, newRef] of Object.entries(renames)) {
      gltf = gltf.replaceAll(oldRef, newRef);
    }
    writeFileSync(GLTF_PATH, gltf, 'utf8');
    console.log(`\nPatched scene.gltf: ${Object.keys(renames).length} references updated`);
  }

  const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(2);
  const pct = totalBefore > 0 ? (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1) : '0';
  console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(2)}MB → ${(totalAfter/1024/1024).toFixed(2)}MB (saved ${savedMB}MB, -${pct}%)`);
}

run();
