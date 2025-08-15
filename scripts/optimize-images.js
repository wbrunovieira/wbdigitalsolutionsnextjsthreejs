import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration for different image types
const IMAGE_CONFIG = {
  hero: { maxWidth: 1920, quality: 80, maxSizeKB: 200 },
  card: { maxWidth: 800, quality: 75, maxSizeKB: 150 },
  icon: { maxWidth: 400, quality: 70, maxSizeKB: 50 },
  background: { maxWidth: 1920, quality: 70, maxSizeKB: 300 },
  large: { maxWidth: 1200, quality: 75, maxSizeKB: 500 }
};

// Map specific images to their types
const IMAGE_TYPES = {
  'website-hands.png': 'background',
  'herobg5.jpg': 'hero',
  'data.jpg': 'large',
  'e-commerce.jpg': 'large',
  'tech3d.png': 'large',
  'website-hands.jpeg': 'background',
  'bot1.png': 'large',
  'machinelearning2.jpg': 'card',
  'chatbot.jpg': 'card',
  'ai.jpg': 'card',
  'machinelearning.jpeg': 'card',
  'web-site.jpg': 'card',
  'machine-learning.jpg': 'card',
  'automation5.png': 'card',
  'engrenagem.png': 'icon',
};

async function optimizeImage(inputPath, outputPath, config) {
  const filename = path.basename(inputPath);
  console.log(`\n📸 Processing: ${filename}`);
  
  try {
    // Get original file size
    const stats = await fs.stat(inputPath);
    const originalSizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`   Original size: ${originalSizeMB}MB`);
    
    // Start with specified quality
    let quality = config.quality;
    let outputBuffer;
    let attempts = 0;
    const maxAttempts = 5;
    
    do {
      outputBuffer = await sharp(inputPath)
        .resize(config.maxWidth, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ 
          quality,
          effort: 6, // Max compression effort
          smartSubsample: true,
          nearLossless: false
        })
        .toBuffer();
      
      const sizeKB = outputBuffer.length / 1024;
      
      if (sizeKB > config.maxSizeKB && quality > 20) {
        quality -= 10; // Reduce quality if still too large
        console.log(`   Attempt ${attempts + 1}: ${sizeKB.toFixed(0)}KB @ quality ${quality + 10} - reducing quality...`);
      } else {
        console.log(`   ✅ Final size: ${sizeKB.toFixed(0)}KB @ quality ${quality}`);
        break;
      }
      
      attempts++;
    } while (attempts < maxAttempts);
    
    // Save optimized image
    await fs.writeFile(outputPath, outputBuffer);
    
    // Calculate savings
    const newStats = await fs.stat(outputPath);
    const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
    const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);
    
    console.log(`   💾 Saved: ${originalSizeMB}MB → ${newSizeMB}MB (${savings}% reduction)`);
    
    return {
      original: filename,
      originalSize: stats.size,
      newSize: newStats.size,
      savings: savings
    };
  } catch (error) {
    console.error(`   ❌ Error processing ${filename}:`, error.message);
    return null;
  }
}

async function processAllImages() {
  console.log('🚀 Starting image optimization...\n');
  
  const imgDir = path.join(__dirname, '..', 'public', 'img');
  const optimizedDir = path.join(imgDir, 'optimized');
  
  // Create optimized directory if it doesn't exist
  try {
    await fs.mkdir(optimizedDir, { recursive: true });
  } catch (error) {
    console.error('Error creating directory:', error);
  }
  
  // Get all image files
  const files = await fs.readdir(imgDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|webp)$/i.test(file) && 
    !file.includes('optimized') &&
    !file.includes('favicon')
  );
  
  console.log(`Found ${imageFiles.length} images to optimize`);
  
  const results = [];
  
  // Process each image
  for (const file of imageFiles) {
    const inputPath = path.join(imgDir, file);
    const outputName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const outputPath = path.join(optimizedDir, outputName);
    
    // Determine config based on image type
    const imageType = IMAGE_TYPES[file] || 'large';
    const config = IMAGE_CONFIG[imageType];
    
    const result = await optimizeImage(inputPath, outputPath, config);
    if (result) results.push(result);
  }
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(60));
  
  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalNew = results.reduce((sum, r) => sum + r.newSize, 0);
  const totalSavings = ((1 - totalNew / totalOriginal) * 100).toFixed(1);
  
  console.log(`\n✅ Optimized ${results.length} images`);
  console.log(`📦 Original total: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
  console.log(`📦 New total: ${(totalNew / 1024 / 1024).toFixed(2)}MB`);
  console.log(`💾 Total savings: ${totalSavings}%`);
  console.log(`🎉 Reduced by ${((totalOriginal - totalNew) / 1024 / 1024).toFixed(2)}MB!`);
  
  // Create a mapping file for easy replacement
  const mapping = {};
  results.forEach(r => {
    const originalName = r.original;
    const webpName = originalName.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    mapping[`/img/${originalName}`] = `/img/optimized/${webpName}`;
  });
  
  await fs.writeFile(
    path.join(__dirname, '..', 'image-mapping.json'),
    JSON.stringify(mapping, null, 2)
  );
  
  console.log('\n📝 Image mapping saved to image-mapping.json');
  console.log('   Use this to update your components to use the new WebP images');
}

// Run the optimization
processAllImages().catch(console.error);