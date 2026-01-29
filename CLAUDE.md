# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Connor Ludwig (https://cjlludwig.github.io). React 19 + Vite single-page app with automated content management from a single source of truth (`resume.md`).

## Key Commands

```bash
npm run dev              # Start dev server with HMR
npm run build            # Production build (includes parsing + PDF generation)
npm run validate         # CI validation - run before committing
npm run parse-resume     # Parse resume.md → src/data/resume-data.json
npm run generate-blogs   # Parse blogs/*.md → src/data/blogs.json
npm run generate-icons   # Generate favicons and social cards
npm run deploy           # Manual deploy to GitHub Pages
```

First-time setup:
```bash
npm install
npm run setup            # Generates icons + parses resume
```

PDF generation requires Pandoc + XeLaTeX installed locally.

## Architecture

### Single Source of Truth Pattern

```
resume.md (edit this)
    ↓ npm run parse-resume
src/data/resume-data.json (auto-generated, never edit)
    ↓
React components consume JSON

blogs/*.md (create/edit posts here)
    ↓ npm run generate-blogs
src/data/blogs.json (auto-generated)
```

All content flows from markdown files through Node.js parser scripts to JSON, which React components then import directly.

### Component Pattern

Components in `src/components/` follow a consistent pattern:
- Import data from `../data/resume-data.json`
- Use semantic HTML sections
- Apply CSS classes from `src/App.css`
- Export as default functional component

### Routing

Hash-based routing without React Router. `App.jsx` parses `window.location.hash` to determine current view (`#/blog`, `#/blog/slug`).

### Styling

Pure CSS with CSS variables for theming in `src/App.css`. Dark mode toggles `.dark` class on `<html>`. No Tailwind or CSS-in-JS.

## Key Directories

- `src/components/` - React components (Hero, Experience, Skills, BlogPost, etc.)
- `src/data/` - Auto-generated JSON files (do not edit manually)
- `scripts/` - Node.js build scripts (parsers, generators)
- `blogs/` - Markdown blog posts (format: `MM-DD-YY-title.md`)
- `.cursor/rules/` - IDE development guidelines

## Workflow

**Updating resume content:** Edit `resume.md` → `npm run validate` → commit to feature branch → PR → merge to main (auto-deploys)

**Adding blog posts:** Create `blogs/MM-DD-YY-title.md` with frontmatter (title, date, excerpt, tags) → `npm run generate-blogs`

**Git workflow:** Feature branches required. Pre-commit hooks auto-generate files. Push to main triggers GitHub Actions deployment.

## Tech Stack

- React 19, Vite 7, React Icons
- Gray-matter + Marked + Highlight.js + Mermaid (markdown/blog rendering)
- Sharp (image processing)
- gh-pages (deployment)
- Node.js 22.x required
