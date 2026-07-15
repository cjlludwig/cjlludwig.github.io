import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { codeToHtml } from 'shiki'
import { figures } from './figures/index.js'
import { assemble } from './figures/_lib.js'

const BLOGS_DIR = path.join(process.cwd(), 'blogs')
const OUTPUT_DIR = path.join(process.cwd(), 'src', 'data')
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'blogs.json')

const FIX_MODE = process.argv.includes('--fix')

function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Module-level cache: bridges async walkTokens results to the synchronous renderer
const shikiCache = new Map()
// Tracks the file currently being parsed so renderer errors can report the source
let currentFile = ''

function validateMermaidSyntax(code, sourceFile) {
  const firstLine = code.trim().split('\n')[0].trim()
  const flowchartNoDir = /^(flowchart|graph)\s*$/i.test(firstLine)
  if (flowchartNoDir) {
    throw new Error(
      `[Mermaid] Missing direction in "${firstLine}" in ${sourceFile}.\n` +
      `  Use: flowchart TD | flowchart LR | flowchart RL | flowchart BT`
    )
  }
}

// Swap a ```figure``` stub for build-time generated inline SVG.
// Block body is simple `key: value` lines; `name` selects the figure module.
function renderFigure(text) {
  const params = {}
  for (const ln of String(text).split('\n')) {
    const m = ln.match(/^\s*([\w-]+)\s*:\s*(.+?)\s*$/)
    if (m) params[m[1]] = m[2]
  }
  const build = figures[params.name]
  if (!build) {
    throw new Error(`[figure] Unknown figure "${params.name}" in ${currentFile}. Known: ${Object.keys(figures).join(', ')}`)
  }
  return assemble(params.name, build())
}

function configureMarked() {
  shikiCache.clear()

  // walkTokens runs async before rendering — populate shikiCache per code block
  marked.use({
    async: true,
    async walkTokens(token) {
      if (token.type !== 'code') return
      const rawLang = (token.lang || '').split(/\s+/)[0].toLowerCase()
      if (rawLang === 'mermaid') return
      if (rawLang === 'figure') return // handled synchronously in the renderer
      const displayLang = rawLang || 'text'
      const safeText = String(token.text || '')
      const key = `${displayLang}:::${safeText}`
      if (shikiCache.has(key)) return
      try {
        shikiCache.set(key, await codeToHtml(safeText, {
          lang: displayLang,
          theme: 'github-dark-dimmed',
        }))
      } catch {
        try {
          shikiCache.set(key, await codeToHtml(safeText, { lang: 'text', theme: 'github-dark-dimmed' }))
        } catch {
          shikiCache.set(key, null)
        }
      }
    },
    renderer: {
      // Generate id attributes on headings so in-page anchor links work.
      // Uses GFM slug rules (matches markdownlint MD051 expectations):
      // lowercase → strip non-alphanumeric except spaces/hyphens → spaces→hyphens.
      // Consecutive hyphens are NOT collapsed so & → -- (two surrounding spaces).
      heading(text, level, raw) {
        const rawText = (typeof raw === 'string' ? raw : text)
          .replace(/^#+\s+/, '')
          .replace(/<[^>]*>/g, '')
          .trim()
        const id = rawText
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
        // GitHub-readme-style anchor: a hover-revealed "#" link next to the heading
        // text that updates the URL hash for sharing, without making the whole
        // heading itself a link.
        const anchor = `<a href="#${id}" class="header-anchor" aria-label="Link to this section">#</a>`
        return `<h${level} id="${id}">${text}${anchor}</h${level}>\n`
      },
      // Synchronous renderer: looks up pre-computed Shiki HTML from cache
      // Note: marked v13 calls code(text, lang, escaped) — not a token object
      code(text, lang) {
        const rawLang = (lang || '').split(/\s+/)[0].toLowerCase()
        if (rawLang === 'mermaid') {
          validateMermaidSyntax(text, currentFile)
          return `<pre class="mermaid">${text}</pre>\n`
        }
        if (rawLang === 'figure') {
          return renderFigure(text)
        }
        const displayLang = rawLang || 'text'
        const safeText = String(text || '')
        const key = `${displayLang}:::${safeText}`
        const shikiHtml = shikiCache.get(key) || `<pre><code>${escapeHtml(safeText)}</code></pre>`
        return (
          `<div class="code-block" data-lang="${displayLang}">\n` +
          `  <div class="code-block-header">\n` +
          `    <span class="code-block-lang">${displayLang}</span>\n` +
          `  </div>\n` +
          shikiHtml + '\n' +
          `</div>\n`
        )
      }
    }
  })
  marked.setOptions({ gfm: true, breaks: true })
}

function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function extractTitleFromContent(content) {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : null
}

function extractDescriptionFromContent(content) {
  // Remove the first heading line and find the first paragraph
  const withoutHeading = content.replace(/^#\s+.+$/m, '').trim()
  // Split by double newlines to get paragraphs
  const paragraphs = withoutHeading.split(/\n\n+/)

  for (const para of paragraphs) {
    const trimmed = para.trim()
    // Skip empty, headings, code blocks, or list items
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('```') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      continue
    }
    // Clean up and truncate to ~160 chars
    const cleaned = trimmed.replace(/\n/g, ' ').replace(/\s+/g, ' ')
    if (cleaned.length <= 160) {
      return cleaned
    }
    // Truncate at word boundary
    const truncated = cleaned.slice(0, 157)
    const lastSpace = truncated.lastIndexOf(' ')
    return (lastSpace > 100 ? truncated.slice(0, lastSpace) : truncated) + '...'
  }
  return ''
}

function inferFrontmatter(content) {
  const title = extractTitleFromContent(content) || 'Untitled'
  const date = new Date().toISOString().split('T')[0]
  const slug = toKebabCase(title)
  const description = extractDescriptionFromContent(content)

  return {
    title,
    date,
    slug,
    description,
    tags: [],
    image: ''
  }
}

function hasFrontmatter(raw) {
  return raw.trimStart().startsWith('---')
}

function fixBlogFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8')

  if (hasFrontmatter(raw)) {
    console.log(`  Skipped (has frontmatter): ${path.basename(filePath)}`)
    return false
  }

  const content = raw.trim()
  const frontmatter = inferFrontmatter(content)

  const frontmatterYaml = `---
title: "${frontmatter.title}"
date: "${frontmatter.date}"
slug: "${frontmatter.slug}"
description: "${frontmatter.description}"
tags: []
image: ""
---

`

  fs.writeFileSync(filePath, frontmatterYaml + content)
  console.log(`  Fixed: ${path.basename(filePath)}`)
  console.log(`    title: "${frontmatter.title}"`)
  console.log(`    slug: "${frontmatter.slug}"`)
  return true
}

function fixBlogs() {
  if (!fs.existsSync(BLOGS_DIR)) {
    console.log('No blogs directory found.')
    return
  }

  const files = fs
    .readdirSync(BLOGS_DIR)
    .filter((file) => file.endsWith('.md') && !/^[A-Z_]/.test(file))

  if (files.length === 0) {
    console.log('No markdown files found in blogs directory.')
    return
  }

  console.log('Checking blog files for missing frontmatter...')
  let fixedCount = 0

  for (const file of files) {
    const filePath = path.join(BLOGS_DIR, file)
    if (fixBlogFile(filePath)) {
      fixedCount++
    }
  }

  console.log(`\nDone. Fixed ${fixedCount} file(s).`)
}

async function loadPosts() {
  if (!fs.existsSync(BLOGS_DIR)) {
    return []
  }

  const files = fs
    .readdirSync(BLOGS_DIR)
    .filter((file) => file.endsWith('.md') && !/^[A-Z_]/.test(file))

  const posts = await Promise.all(files.map(async (file) => {
    const filePath = path.join(BLOGS_DIR, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    const slugFromFile = file.replace(/\.md$/, '')
    const slug = data.slug || slugFromFile
    currentFile = file
    const html = await marked.parse(content)

    let description = data.description || ''
    if (description.length > 160) {
      const truncated = description.slice(0, 157)
      const lastSpace = truncated.lastIndexOf(' ')
      description = (lastSpace > 100 ? truncated.slice(0, lastSpace) : truncated) + '...'
      throw new Error(`[SEO] Description exceeds 160 chars in ${file} (${data.description.length} chars). Shorten it to continue.`)
    }

    return {
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      slug,
      description,
      tags: data.tags || [],
      image: data.image || '',
      html,
    }
  }))

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

async function generateBlogs() {
  ensureOutputDir()
  configureMarked()
  const posts = await loadPosts()

  const payload = {
    generatedAt: new Date().toISOString(),
    posts,
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2))
  console.log(`Generated ${posts.length} blog posts to ${OUTPUT_FILE}`)
}

if (FIX_MODE) {
  fixBlogs()
} else {
  generateBlogs().catch(console.error)
}
