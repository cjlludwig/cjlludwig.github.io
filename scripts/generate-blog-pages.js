import fs from 'fs'
import path from 'path'

const SITE_URL = 'https://cjlludwig.github.io'
const DIST_DIR = path.join(process.cwd(), 'dist')
const BLOGS_JSON = path.join(process.cwd(), 'src', 'data', 'blogs.json')
const DIST_INDEX = path.join(DIST_DIR, 'index.html')

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function extractAssetTags(indexHtml) {
  // Extract the script and link tags that Vite generates
  const scriptMatch = indexHtml.match(/<script type="module" crossorigin src="[^"]+"><\/script>/)
  const cssMatch = indexHtml.match(/<link rel="stylesheet" crossorigin href="[^"]+">/)

  return {
    scriptTag: scriptMatch ? scriptMatch[0] : '',
    cssTag: cssMatch ? cssMatch[0] : ''
  }
}

function resolveImage(image) {
  if (!image) return `${SITE_URL}/og-image.png`
  if (/^https?:\/\//.test(image)) return image
  return `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`
}

function generateBlogPostPage(post, assetTags) {
  const title = escapeHtml(post.title)
  const description = escapeHtml(post.description || `Read ${post.title} by Connor Ludwig`)
  const url = `${SITE_URL}/blog/${post.slug}/`
  const image = resolveImage(post.image)
  const date = post.date ? new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : ''

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Favicons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <!-- Theme Colors -->
    <meta name="theme-color" content="#2563eb" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />

    <!-- SEO Meta Tags -->
    <title>${title} | Connor Ludwig</title>
    <meta name="description" content="${description}" />
    <meta name="author" content="Connor Ludwig" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${url}" />

    <!-- Open Graph -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="Connor Ludwig" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${title}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${url}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${title}" />
    <meta name="twitter:creator" content="@cjlludwig" />
    <meta name="twitter:site" content="@cjlludwig" />

    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "@id": "${url}#blogposting",
          "headline": "${title}",
          "description": "${description}",
          "url": "${url}",
          "image": "${image}",
          "mainEntityOfPage": { "@id": "${url}" },
          "isPartOf": { "@id": "${SITE_URL}/#website" },
          "datePublished": "${post.date || ''}",
          "dateModified": "${post.date || ''}",
          "author": {
            "@type": "Person",
            "@id": "${SITE_URL}/#person",
            "name": "Connor Ludwig",
            "url": "${SITE_URL}/"
          },
          "publisher": {
            "@type": "Person",
            "@id": "${SITE_URL}/#person",
            "name": "Connor Ludwig",
            "logo": {
              "@type": "ImageObject",
              "url": "${SITE_URL}/android-chrome-512x512.png",
              "width": 512,
              "height": 512
            }
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "${SITE_URL}/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "${SITE_URL}/blog/" },
            { "@type": "ListItem", "position": 3, "name": "${title}", "item": "${url}" }
          ]
        }
      ]
    }
    </script>
    ${assetTags.scriptTag}
    ${assetTags.cssTag}
  </head>
  <body>
    <div id="root">
      <!-- Pre-rendered content for SEO -->
      <article>
        <header>
          <h1>${title}</h1>
          ${date ? `<time datetime="${post.date}">${date}</time>` : ''}
        </header>
        <div class="blog-content">
          ${post.html}
        </div>
      </article>
    </div>
  </body>
</html>
`
}

function generateBlogIndexPage(posts, assetTags) {
  const title = 'Blog | Connor Ludwig'
  const description = 'Technical articles on distributed systems, cloud architecture, AI engineering, and software development by Connor Ludwig.'
  const url = `${SITE_URL}/blog/`

  const postListHtml = posts.map(post => {
    const postTitle = escapeHtml(post.title)
    const postDescription = escapeHtml(post.description || '')
    const date = post.date ? new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : ''
    return `
        <article>
          <h2><a href="/blog/${post.slug}/">${postTitle}</a></h2>
          ${date ? `<time datetime="${post.date}">${date}</time>` : ''}
          ${postDescription ? `<p>${postDescription}</p>` : ''}
        </article>`
  }).join('\n')

  const blogPostListItems = posts.map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${SITE_URL}/blog/${post.slug}/`,
    name: post.title
  }))

  const indexJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${url}#blog`,
        url,
        name: title,
        description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        author: { '@id': `${SITE_URL}/#person` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: blogPostListItems
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: url }
        ]
      }
    ]
  })

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Favicons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <!-- Theme Colors -->
    <meta name="theme-color" content="#2563eb" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />

    <!-- SEO Meta Tags -->
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="author" content="Connor Ludwig" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${url}" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="Connor Ludwig" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${SITE_URL}/og-image.png" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${url}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${SITE_URL}/twitter-card.png" />
    <meta name="twitter:image:alt" content="${escapeHtml(title)}" />
    <meta name="twitter:creator" content="@cjlludwig" />
    <meta name="twitter:site" content="@cjlludwig" />

    <!-- Structured Data -->
    <script type="application/ld+json">
    ${indexJsonLd}
    </script>
    ${assetTags.scriptTag}
    ${assetTags.cssTag}
  </head>
  <body>
    <div id="root">
      <!-- Pre-rendered content for SEO -->
      <main>
        <h1>Blog</h1>
        <section>
${postListHtml}
        </section>
      </main>
    </div>
  </body>
</html>
`
}

function generateBlogPages() {
  if (!fs.existsSync(DIST_INDEX)) {
    console.log('No dist/index.html found, run vite build first')
    return
  }

  if (!fs.existsSync(BLOGS_JSON)) {
    console.log('No blogs.json found, skipping blog page generation')
    return
  }

  // Read the built index.html to extract asset tags
  const indexHtml = fs.readFileSync(DIST_INDEX, 'utf-8')
  const assetTags = extractAssetTags(indexHtml)

  const blogsData = JSON.parse(fs.readFileSync(BLOGS_JSON, 'utf-8'))
  const posts = blogsData.posts || []

  if (posts.length === 0) {
    console.log('No blog posts found, skipping blog page generation')
    return
  }

  // Create blog index page
  const blogDir = path.join(DIST_DIR, 'blog')
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true })
  }

  const blogIndexHtml = generateBlogIndexPage(posts, assetTags)
  fs.writeFileSync(path.join(blogDir, 'index.html'), blogIndexHtml)
  console.log(`Generated /blog/index.html`)

  // Create individual blog post pages
  let count = 0
  for (const post of posts) {
    const postDir = path.join(blogDir, post.slug)
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true })
    }

    const postHtml = generateBlogPostPage(post, assetTags)
    fs.writeFileSync(path.join(postDir, 'index.html'), postHtml)
    count++
  }

  console.log(`✅ Generated ${count} blog post pages`)
}

generateBlogPages()
