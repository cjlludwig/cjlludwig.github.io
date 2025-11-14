import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');

// Create a professional social sharing image (1200x630 for optimal OG image)
async function generateSocialImage() {
  console.log('🎨 Generating social sharing image...\n');
  
  const width = 1200;
  const height = 630;
  
  // Create SVG for the social card
  const socialCardSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
      
      <!-- Subtle grid pattern -->
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grid)"/>
      
      <!-- Accent bar at top -->
      <rect x="0" y="0" width="${width}" height="8" fill="url(#accentGrad)"/>
      
      <!-- Main content container -->
      <g transform="translate(100, 160)">
        <!-- Logo/Icon -->
        <circle cx="80" cy="80" r="76" fill="url(#accentGrad)"/>
        <text x="80" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="70" font-weight="700" fill="white" text-anchor="middle" dominant-baseline="central">CL</text>
        
        <!-- Text content -->
        <text x="200" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="54" font-weight="700" fill="#f1f5f9">
          Connor Ludwig
        </text>
        <text x="200" y="110" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="600" fill="#3b82f6">
          Senior Staff Software Engineer
        </text>
        <text x="200" y="165" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="500" fill="#94a3b8">
          Distributed Systems • Cloud Architecture • Technical Leadership
        </text>
      </g>
      
      <!-- Bottom info -->
      <text x="100" y="560" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="500" fill="#64748b">
        cjlludwig.github.io
      </text>
      
      <!-- Decorative elements -->
      <circle cx="1050" cy="150" r="120" fill="rgba(59, 130, 246, 0.1)"/>
      <circle cx="1100" cy="500" r="80" fill="rgba(37, 99, 235, 0.08)"/>
    </svg>
  `;
  
  try {
    // Generate OG image (1200x630)
    await sharp(Buffer.from(socialCardSvg))
      .png()
      .toFile(path.join(publicDir, 'og-image.png'));
    
    console.log('✅ Generated og-image.png (1200x630)');
    
    // Generate Twitter card (1200x600)
    const twitterCardSvg = socialCardSvg.replace('height="630"', 'height="600"');
    await sharp(Buffer.from(twitterCardSvg))
      .png()
      .toFile(path.join(publicDir, 'twitter-card.png'));
    
    console.log('✅ Generated twitter-card.png (1200x600)');
    
    console.log('\n✨ Social image generation complete!');
  } catch (error) {
    console.error('❌ Failed to generate social images:', error.message);
  }
}

generateSocialImage().catch(console.error);

