import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import hljs from 'highlight.js'

const BLOGS_DIR = path.join(process.cwd(), 'blogs')
const OUTPUT_DIR = path.join(process.cwd(), 'src', 'data')
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'blogs.json')

function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }
}

function configureMarked() {
  marked.setOptions({
    gfm: true,
    breaks: true,
    highlight(code, lang) {
      if (lang && lang.toLowerCase() === 'mermaid') {
        return `<pre class="mermaid">${code}</pre>`
      }
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value
      }
      return hljs.highlightAuto(code).value
    },
  })
}

function loadPosts() {
  if (!fs.existsSync(BLOGS_DIR)) {
    return []
  }

  const files = fs
    .readdirSync(BLOGS_DIR)
    .filter((file) => file.endsWith('.md'))

  const posts = files
    .map((file) => {
      const filePath = path.join(BLOGS_DIR, file)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)

      const slugFromFile = file.replace(/\.md$/, '')
      const slug = data.slug || slugFromFile
      const html = marked.parse(content)

      return {
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        slug,
        description: data.description || '',
        tags: data.tags || [],
        image: data.image || '',
        html,
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return posts
}

function generateBlogs() {
  ensureOutputDir()
  configureMarked()
  const posts = loadPosts()

  const payload = {
    generatedAt: new Date().toISOString(),
    posts,
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2))
  console.log(`Generated ${posts.length} blog posts to ${OUTPUT_FILE}`)
}

generateBlogs()
