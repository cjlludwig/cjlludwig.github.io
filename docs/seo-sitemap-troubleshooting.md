# SEO Sitemap Troubleshooting

## Problem Summary

Google Search Console showed two persistent errors:
1. **"Sitemap could not be read"** / **"Couldn't fetch"** for `/sitemap.xml` (since Feb 1, 2026)
2. **"Redirect error"** — pages on the site not being indexed (notified Feb 4, 2026)

## Root Cause: `404.html` SPA Redirect

The original `404.html` was a GitHub Pages SPA routing workaround that redirected all unknown paths to `/?p=<encoded-path>`. This caused Google's crawler to encounter redirect loops:

```
/some-path/ → HTTP 404 (404.html) → JS redirect → /?p=%2Fsome-path%2F → React app restores URL via history.replaceState → /some-path/
```

Google sees: URL → 404 → JS redirect → different URL → JS redirect back = **redirect error**.

This pattern was needed historically when the site was a pure SPA (no static files per route). It became harmful once SSG (static site generation) was added, because:
- All real routes now have static HTML files (HTTP 200)
- The redirect only fires for truly non-existent URLs
- But Google was still discovering/crawling some of those URLs and hitting the loop

## Fix Applied

### 1. Replaced `public/404.html` with a proper 404 page

Removed the `window.location.replace('/?p=...')` JavaScript redirect. Replaced with a clean "Page Not Found" page with `<meta name="robots" content="noindex">`.

### 2. Removed `restorePathFromRedirect()` from `src/App.jsx`

Dead code that read `?p=` query params and called `window.history.replaceState` — no longer needed since 404.html no longer redirects there.

### 3. Added `public/sitemap-index.xml`

A sitemap index file pointing to the main `sitemap.xml`. Submitted this as a fresh entry in GSC to work around the stale "Couldn't fetch" cache on the original `/sitemap.xml` entry (which GSC wouldn't let us delete).

### 4. Updated `public/robots.txt`

Added the sitemap index reference alongside the original:
```
Sitemap: https://cjlludwig.github.io/sitemap.xml
Sitemap: https://cjlludwig.github.io/sitemap-index.xml
```

## Validation Performed

Everything below was confirmed returning HTTP 200 with correct headers:

| URL | Status | Content-Type |
|-----|--------|--------------|
| `/sitemap.xml` | 200 | application/xml |
| `/sitemap-index.xml` | 200 | application/xml |
| `/blog/` | 200 | text/html |
| `/blog/claude-code-save-plan-hook/` | 200 | text/html |
| `/robots.txt` | 200 | text/plain |

XML was confirmed valid with `xmllint`. No BOM or encoding issues. No redirects on Googlebot user-agent. Canonical tags and `robots: index, follow` confirmed on all pages.

## Why "Couldn't Fetch" Persisted

The `sitemap-index.xml` was submitted to GSC immediately after the commit that created it, before GitHub Actions finished deploying. Google's crawler fetched it during that window and got a 404. After deployment completed, both files returned 200 — but GSC showed the stale error.

**Always wait for deployment to finish before submitting sitemaps to GSC.**

## If Still Broken After 48 Hours

Next steps to investigate in order:

1. **Check if `.nojekyll` is deployed** — the `gh-pages` branch is missing `.nojekyll`. Without it, GitHub Pages processes the site through Jekyll. This shouldn't affect XML files but can cause unexpected behavior. Add an empty `.nojekyll` file to `public/` and update the deploy command:
   ```bash
   npx gh-pages -d dist --dotfiles -u "github-actions-bot ..."
   ```

2. **Check for redirect errors on specific URLs** — Use GSC → Pages → "Why pages aren't indexed" → "Redirect error" to see which specific URLs Google is flagging. Investigate whether any blog post content contains links to non-existent internal paths.

3. **Use GSC URL Inspection** — Inspect `https://cjlludwig.github.io/` and `https://cjlludwig.github.io/blog/` directly in GSC. Click "Request indexing" to force a fresh crawl of individual pages.

4. **Verify property ownership** — Confirm `https://cjlludwig.github.io/google181b4d845c49a2b2.html` returns 200 and the GSC property is fully verified.

5. **Check GitHub Pages CDN propagation** — After deploying, wait at least 10 minutes (GitHub Pages CDN `max-age=600`) before triggering a GSC re-read.

6. **Try submitting a plain text sitemap** — As a last resort, create `public/sitemap.txt` with one URL per line and submit that instead. Google accepts plain text sitemaps and they bypass any XML parsing issues.

## Architecture Notes

The site uses two routing layers that must stay in sync:

- **Client-side routing** (`App.jsx`): Hash-based (`#/blog`, `#/blog/slug`) for SPA navigation after initial load
- **SSG** (`scripts/generate-blog-pages.js`): Generates static HTML at `/dist/blog/{slug}/index.html` for direct URL access and SEO

Every URL in `sitemap.xml` must have a corresponding static file in `dist/`. The `generate-sitemap.js` script reads from `src/data/blogs.json`, which is populated by `generate-blogs.js`. The build order in `package.json` ensures this happens in the right sequence.
