import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');

function makeSvgOverlay(width, height) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
        </linearGradient>
      </defs>


      <!-- Text content -->
      <g transform="translate(80, 160)">
        <text x="370" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="54" font-weight="700" fill="#f1f5f9">
          Connor Ludwig
        </text>
        <text x="370" y="110" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="600" fill="#93c5fd">
          Senior Staff Software Engineer
        </text>
        <text x="370" y="165" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="500" fill="#cbd5e1">
          Engineer | Tech Leader | History Buff | Movie &amp; Music Lover
        </text>
      </g>

      <!-- Bottom URL -->
      <text x="100" y="560" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="500" fill="#64748b">
        cjlludwig.github.io
      </text>
    </svg>
  `);
}

async function generateSocialImage() {
  console.log('🎨 Generating social sharing image...\n');

  const backgroundPath = path.join(publicDir, 'images/background_gradient.png');
  const logoPath = path.join(publicDir, 'images/laptop_logo_clear_background.png');
  const initialsPath = path.join(publicDir, 'images/initials.png');

  if (!fs.existsSync(backgroundPath)) {
    console.error('❌ background_gradient.png not found');
    process.exit(1);
  }
  if (!fs.existsSync(logoPath)) {
    console.error('❌ laptop_logo_clear_background.png not found');
    process.exit(1);
  }
  if (!fs.existsSync(initialsPath)) {
    console.error('❌ initials.png not found');
    process.exit(1);
  }

  // 220px wide → ~147px tall (3:2 ratio); vertically centered with text block (~y=195–y=342)
  const logoBuffer = await sharp(logoPath)
    .resize(220, null)
    .png()
    .toBuffer();

  const initialsBuffer = await sharp(initialsPath)
    .resize(380, null)
    .png()
    .toBuffer();

  try {
    // OG image — 1200x630
    const ogOverlay = makeSvgOverlay(1200, 630);
    await sharp(backgroundPath)
      .resize(1200, 630, { fit: 'cover' })
      .composite([
        { input: ogOverlay, top: 0, left: 0 },
        { input: initialsBuffer, top: 135, left: 50 },
      ])
      .png()
      .toFile(path.join(publicDir, 'og-image.png'));
    console.log('✅ Generated og-image.png (1200x630)');

    // Twitter card — 1200x600
    const twitterOverlay = makeSvgOverlay(1200, 600);
    await sharp(backgroundPath)
      .resize(1200, 600, { fit: 'cover' })
      .composite([
        { input: twitterOverlay, top: 0, left: 0 },
        { input: initialsBuffer, top: 120, left: 50 },
      ])
      .png()
      .toFile(path.join(publicDir, 'twitter-card.png'));
    console.log('✅ Generated twitter-card.png (1200x600)');

    console.log('\n✨ Social image generation complete!');
  } catch (error) {
    console.error('❌ Failed to generate social images:', error.message);
  }
}

generateSocialImage().catch(console.error);
