import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the HTML file
const htmlPath = join(__dirname, '../src/components/movies.html');
const html = readFileSync(htmlPath, 'utf8');

// Parse movie data from Letterboxd HTML
const movies = [];

// Match all movie poster items
const posterRegex = /<li class="griditem">([\s\S]*?)<\/li>/g;
let match;

while ((match = posterRegex.exec(html)) !== null) {
  const posterHtml = match[1];
  
  // Extract title and year
  const titleMatch = posterHtml.match(/data-item-name="([^"]+)"/);
  const slugMatch = posterHtml.match(/data-item-slug="([^"]+)"/);
  // Get high-res image from srcset (2x resolution)
  const srcsetMatch = posterHtml.match(/srcset="([^"]+)"/);
  const imageUrl = srcsetMatch ? srcsetMatch[1].split(' ')[0] : ''; // Get first URL from srcset
  const ratingMatch = posterHtml.match(/rating rated-(\d+)/);
  const dateMatch = posterHtml.match(/datetime="([^"]+)"/);
  
  if (titleMatch && slugMatch && imageUrl) {
    const fullTitle = titleMatch[1];
    const titleParts = fullTitle.match(/^(.+?)\s+\((\d{4})\)$/);
    
    const movie = {
      title: titleParts ? titleParts[1] : fullTitle,
      year: titleParts ? titleParts[2] : '',
      slug: slugMatch[1],
      poster: imageUrl,
      rating: ratingMatch ? parseInt(ratingMatch[1]) / 2 : 0, // Convert 10-point to 5-point
      dateWatched: dateMatch ? new Date(dateMatch[1]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
      url: `https://letterboxd.com/film/${slugMatch[1]}/`
    };
    
    movies.push(movie);
  }
}

console.log(`✅ Parsed ${movies.length} movies from Letterboxd`);

// Generate JavaScript module
const outputPath = join(__dirname, '../src/components/movies-data.js');
const output = `// Auto-generated from Letterboxd export
// Run: node scripts/parse-movies.js

export const movies = ${JSON.stringify(movies, null, 2)};

export default movies;
`;

writeFileSync(outputPath, output, 'utf8');
console.log(`✅ Movie data saved to ${outputPath}`);
console.log(`   - Total movies: ${movies.length}`);
console.log(`   - 5-star ratings: ${movies.filter(m => m.rating === 5).length}`);

