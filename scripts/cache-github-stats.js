import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_USERNAME = 'cjlludwig';
const OUTPUT_DIR = path.join(__dirname, '../public/images/github');

const STATS_URL = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=1e293b&title_color=3b82f6&icon_color=3b82f6&text_color=cbd5e1&hide_rank=true`;
const LANGUAGES_URL = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=tokyonight&hide_border=true&bg_color=1e293b&title_color=3b82f6&text_color=cbd5e1&card_width=300`;

async function fetchAndSave(url, filename) {
  try {
    console.log(`Fetching ${filename}...`);
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`Warning: Failed to fetch ${filename} (${response.status}). Using existing cache if available.`);
      return false;
    }

    const svg = await response.text();
    const outputPath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(outputPath, svg);
    console.log(`Saved ${filename}`);
    return true;
  } catch (error) {
    console.warn(`Warning: Could not fetch ${filename}: ${error.message}. Using existing cache if available.`);
    return false;
  }
}

async function main() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = await Promise.all([
    fetchAndSave(STATS_URL, 'stats.svg'),
    fetchAndSave(LANGUAGES_URL, 'languages.svg')
  ]);

  // Check if we have cached files (either new or existing)
  const statsExists = fs.existsSync(path.join(OUTPUT_DIR, 'stats.svg'));
  const languagesExists = fs.existsSync(path.join(OUTPUT_DIR, 'languages.svg'));

  if (statsExists && languagesExists) {
    console.log('GitHub stats cached successfully.');
  } else {
    console.warn('Some GitHub stats could not be cached. Widgets may show fallback state.');
  }
}

main();
