import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the HTML file
const html = fs.readFileSync(path.join(__dirname, '../src/components/books.html'), 'utf8');

// Extract book data using regex
const bookMatches = [...html.matchAll(/<tr id="review_(\d+)"[\s\S]*?<\/tr>/g)];

const books = bookMatches.map(match => {
  const bookHtml = match[0];
  
  // Extract title
  const titleMatch = bookHtml.match(/<a title="([^"]+)" href="\/book\/show\/[^"]+">[\s\S]*?<\/a>/);
  const title = titleMatch ? titleMatch[1].replace(/ \([^)]+\)$/, '').trim() : '';
  
  // Extract series if exists
  const seriesMatch = bookHtml.match(/<span class="darkGreyText">\(([^)]+)\)<\/span>/);
  const series = seriesMatch ? seriesMatch[1] : null;
  
  // Extract author
  const authorMatch = bookHtml.match(/<td class="field author">[\s\S]*?<a href="[^"]+">([^<]+)<\/a>/);
  const author = authorMatch ? authorMatch[1].replace(/,\s*/g, ', ') : '';
  
  // Extract cover image
  const coverMatch = bookHtml.match(/src="(https:\/\/i\.gr-assets\.com\/[^"]+)"/);
  const cover = coverMatch ? coverMatch[1].replace('._SY75_', '') : '';
  
  // Extract my rating
  const ratingMatch = bookHtml.match(/data-rating="(\d)"/);
  const rating = ratingMatch ? parseInt(ratingMatch[1]) : 0;
  
  // Extract date read
  const dateMatch = bookHtml.match(/<span class="date_read_value">([^<]+)<\/span>/);
  const dateRead = dateMatch ? dateMatch[1] : '';
  
  // Extract Goodreads link
  const linkMatch = bookHtml.match(/href="(\/book\/show\/[^"]+)"/);
  const goodreadsUrl = linkMatch ? `https://www.goodreads.com${linkMatch[1]}` : '';
  
  return {
    title,
    series,
    author,
    cover,
    rating,
    dateRead,
    goodreadsUrl
  };
}).filter(book => book.title && book.author);

// Sort by date read (newest first)
books.sort((a, b) => {
  const dateA = new Date(a.dateRead);
  const dateB = new Date(b.dateRead);
  return dateB - dateA;
});

// Generate JSX code
const jsxCode = `const books = [
${books.map(book => `  {
    title: "${book.title.replace(/"/g, '\\"')}",
    ${book.series ? `series: "${book.series.replace(/"/g, '\\"')}",` : '// series: "",'}
    author: "${book.author.replace(/"/g, '\\"')}",
    cover: "${book.cover}",
    rating: ${book.rating},
    dateRead: "${book.dateRead}",
    url: "${book.goodreadsUrl}"
  }`).join(',\n')},
];`;

console.log('📚 Extracted', books.length, 'books from Goodreads HTML');
console.log('\n📝 Generated books array:');
console.log('\nCopy this into your Books.jsx component:\n');
console.log(jsxCode);

// Also save to a file for easy copying
fs.writeFileSync(
  path.join(__dirname, '../src/components/books-data.js'),
  `// Auto-generated from Goodreads export\n// Run: node scripts/parse-books.js\n\nexport ${jsxCode}\n\nexport default books;\n`
);

console.log('\n✅ Saved to: src/components/books-data.js');

