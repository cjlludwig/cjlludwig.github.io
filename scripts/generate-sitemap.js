import fs from 'fs'
import path from 'path'

const SITE_URL = 'https://cjlludwig.github.io'
const OUTPUT_DIR = path.join(process.cwd(), 'public')
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'sitemap.xml')
const BLOGS_JSON = path.join(process.cwd(), 'src', 'data', 'blogs.json')

function generateSitemap() {
  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
  ]

  // Load blog posts
  let blogPosts = []
  if (fs.existsSync(BLOGS_JSON)) {
    const blogsData = JSON.parse(fs.readFileSync(BLOGS_JSON, 'utf-8'))
    blogPosts = (blogsData.posts || []).map((post) => ({
      url: `/blog/${post.slug}`,
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: post.date ? new Date(post.date).toISOString().split('T')[0] : null,
    }))
  }

  const allPages = [...staticPages, ...blogPosts]
  const today = new Date().toISOString().split('T')[0]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod || today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

  fs.writeFileSync(OUTPUT_FILE, xml)
  console.log(`✅ Generated sitemap.xml with ${allPages.length} URLs`)
}

generateSitemap()
