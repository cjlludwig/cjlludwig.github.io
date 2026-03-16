import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const sourcePath = path.join(publicDir, 'favicon.svg');

// Ensure source exists
if (!fs.existsSync(sourcePath)) {
  console.error('❌ favicon.svg not found in public directory');
  process.exit(1);
}

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' }
];

async function generateIcons() {
  console.log('🎨 Generating icons from favicon.svg...\n');

  for (const { size, name } of sizes) {
    const outputPath = path.join(publicDir, name);

    try {
      await sharp(sourcePath)
        .resize(size, size)
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ Failed to generate ${name}:`, error.message);
    }
  }

  // Generate favicon.png (32x32)
  try {
    await sharp(sourcePath)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.png'));

    console.log('✅ Generated favicon.png (32x32)');
  } catch (error) {
    console.error('❌ Failed to generate favicon.png:', error.message);
  }

  // Generate optimized nav logo (64px wide, retina-ready for 32px display)
  try {
    await sharp(sourcePath)
      .resize(64, null)
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicDir, 'images/term_favicon_nav.png'));
    console.log('✅ Generated images/term_favicon_nav.png (64px wide)');
  } catch (error) {
    console.error('❌ Failed to generate term_favicon_nav.png:', error.message);
  }

  console.log('\n✨ Icon generation complete!');
}

generateIcons().catch(console.error);
