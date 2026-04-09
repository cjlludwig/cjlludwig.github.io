# Blog Post Rules

Files here are converted to static HTML by `scripts/generate-blogs.js` during build.

## Frontmatter (required)

```yaml
---
title: "Concise title"
date: "2025-01-15T12:00:00Z"   # ISO 8601
slug: "kebab-case-slug"         # omit to use filename
description: "≤150 char summary"
tags: ["tag-one", "tag-two"]
image: "/blog-images/name.png"  # omit if none
---
```

## Content

- Standard Markdown: headings, lists, tables, blockquotes, code fences
- Syntax highlighting: ` ```js `, ` ```py `, etc. — unknown languages auto-highlight
- Diagrams: ` ```mermaid ` fences — rendered client-side
- Images: prefer root-relative paths (`/blog-images/...`)

## Structure

```markdown
Intro paragraph

## Section

## Putting It Together

## References (optional)
```
