# SEO Sitemap Troubleshooting

## Problem Summary

Google Search Console showed two persistent errors:
1. **"Sitemap could not be read"** / **"Couldn't fetch"** for `/sitemap.xml` (since Feb 1, 2026)
2. **"Redirect error"** — pages on the site not being indexed (notified Feb 4, 2026)

## Root Cause 1: `404.html` SPA Redirect (Fixed Feb 21, 2026)

The original `404.html` was a GitHub Pages SPA routing workaround that redirected all unknown paths to `/?p=<encoded-path>`. This caused Google's crawler to encounter redirect loops:

```
/some-path/ → HTTP 404 (404.html) → JS redirect → /?p=%2Fsome-path%2F → React app restores URL via history.replaceState → /some-path/
```

Google sees: URL → 404 → JS redirect → different URL → JS redirect back = **redirect error**.

This pattern was needed historically when the site was a pure SPA (no static files per route). It became harmful once SSG (static site generation) was added, because:
- All real routes now have static HTML files (HTTP 200)
- The redirect only fires for truly non-existent URLs
- But Google was still discovering/crawling some of those URLs and hitting the loop

## Root Cause 2: Missing Trailing Slashes in React Components (Fixed Mar 7, 2026)

Even after the `404.html` fix, GSC continued showing "Redirect error" (4 pages) and "Page with redirect" (1 page). The actual cause: `BlogIndex.jsx` and `App.jsx` generated links and canonical URLs **without trailing slashes**.

When Googlebot executed JavaScript and rendered the page, it discovered these non-trailing-slash URLs:
- `/blog/slug` (from `BlogIndex` title/readmore links)
- `/blog` (from the nav link and blog index `og:url`)

GitHub Pages 301-redirects these to their trailing-slash equivalents. Combined with `Seo.jsx` dynamically **overwriting the canonical tag** after JS hydration, Googlebot saw conflicting canonicals:

```
Static HTML canonical:   https://cjlludwig.github.io/blog/slug/   ✅
After JS hydration:      https://cjlludwig.github.io/blog/slug    ❌ (overwrites via Seo.jsx)
```

This caused Googlebot to try crawling the no-trailing-slash URL, hit the 301, and report "Redirect error" / "Page with redirect".

## Fixes Applied

### 1. Replaced `public/404.html` with a proper 404 page (Feb 21, 2026)

Removed the `window.location.replace('/?p=...')` JavaScript redirect. Replaced with a clean "Page Not Found" page with `<meta name="robots" content="noindex">`.

### 2. Removed `restorePathFromRedirect()` from `src/App.jsx` (Feb 21, 2026)

Dead code that read `?p=` query params and called `window.history.replaceState` — no longer needed since 404.html no longer redirects there.

### 3. Added `public/sitemap-index.xml` (Feb 21, 2026)

A sitemap index file pointing to the main `sitemap.xml`. Submitted this as a fresh entry in GSC to work around the stale "Couldn't fetch" cache on the original `/sitemap.xml` entry.

### 4. Updated `public/robots.txt` (Feb 21, 2026)

Added the sitemap index reference alongside the original:
```
Sitemap: https://cjlludwig.github.io/sitemap.xml
Sitemap: https://cjlludwig.github.io/sitemap-index.xml
```

### 5. Fixed trailing slashes in `BlogIndex.jsx` and `App.jsx` (Mar 7, 2026)

All blog URLs throughout the React app now use trailing slashes, consistent with the sitemap and static page canonicals:

- `BlogIndex.jsx`: post title links, "Read more" links, "View all posts" link
- `App.jsx`: `og:url`/canonical props passed to `<Seo>` for blog index and blog post pages, nav "Blog" link

**Key invariant:** Because `Seo.jsx` dynamically updates `<link rel="canonical">` after hydration, every `url` prop passed to `<Seo>` must use a trailing slash. The static HTML canonical (set in `generate-blog-pages.js`) is correct, but JS hydration overwrites it — so both must agree.

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

## Root Cause 3: GSC Processing Pipeline State (Apr 9, 2026)

Even after all code fixes, both sitemaps showed "Couldn't fetch" / "Sitemap could not be read" in GSC with 0 discovered pages. Exhaustive server-side verification confirmed the sitemaps were healthy:

- Both `/sitemap.xml` and `/sitemap-index.xml` returned HTTP 200 with `content-type: application/xml`
- XML validated clean with `xmllint` — no BOM, correct UTF-8, correct namespace
- `.nojekyll` was deployed (no Jekyll interference)
- GSC property verification file returned 200

The breakthrough: GSC URL Inspection → **Live Test** on `https://cjlludwig.github.io/sitemap.xml` showed "URL is available to Google" and rendered the raw XML content correctly. Google CAN fetch and parse the file. The Sitemaps tool failure is a **GSC processing pipeline state issue** — not a content or delivery problem.

**Root cause:** Both `/sitemap.xml` and `/sitemap-index.xml` accumulated failure state in GSC's internal processing pipeline from early fetch failures (timing issues during initial deployment). Re-submitting the same URLs does not clear this state — GSC continues to report "Sitemap could not be read" even when the content is valid and accessible.

The "Reprocess" option in the 3-dot menu is greyed out when a sitemap shows "Couldn't fetch" — it only appears after a successful read. Re-submitting via "Add a new sitemap" triggers a fresh fetch attempt but does not clear the failure state for an already-poisoned URL.

**Fix (Apr 9, 2026):**
- Renamed sitemap output from `sitemap.xml` → `sitemap-pages.xml` (fresh URL, no GSC failure history)
- Removed `sitemap-index.xml` entirely (redundant — it only pointed to `sitemap.xml`, provided no value, and had its own poisoned GSC entry)
- Moved sitemap generation from `public/` → `dist/` post-build (it's a build artifact, not a source file)
- Updated `robots.txt` to reference only `sitemap-pages.xml`
- Submit `sitemap-pages.xml` to GSC as a new entry

## Why "Couldn't Fetch" Persisted

The `sitemap-index.xml` was submitted to GSC immediately after the commit that created it, before GitHub Actions finished deploying. Google's crawler fetched it during that window and got a 404. After deployment completed, both files returned 200 — but GSC showed the stale error.

**Always wait for deployment to finish before submitting sitemaps to GSC.**

## GSC Actions After Deploying Fixes

1. **Submit the new sitemap URL** — After deploying, go to GSC → Sitemaps → "Add a new sitemap" and submit `sitemap-pages.xml`. This is a fresh URL with no failure history.

2. **Request indexing for affected URLs** — In GSC → URL Inspection, inspect the redirect-error URLs and click "Request indexing" to trigger a fresh crawl.

3. **Wait** — GSC data lags 1–2 weeks. The "Redirect error" entries will clear on Google's next crawl cycle once it no longer encounters redirects from those URLs.

## Diagnosing Future Sitemap Issues

When GSC shows "Sitemap could not be read" or "Couldn't fetch":

1. **Verify the file is actually accessible**: `curl -sI https://cjlludwig.github.io/sitemap-pages.xml` — confirm HTTP 200 and `content-type: application/xml`
2. **Validate the XML**: `curl -s --compressed https://cjlludwig.github.io/sitemap-pages.xml | xmllint --noout -`
3. **Use GSC Live Test**: URL Inspection → "Test Live URL" on the sitemap URL. If this shows the XML source correctly, the file is fine and the Sitemaps tool failure is a GSC state issue, not a content problem.
4. **If GSC state is poisoned**: The only reliable fix is submitting a new URL — re-submitting the same URL does not clear failure state.

## Architecture Notes

The site uses two routing layers that must stay in sync:

- **Client-side routing** (`App.jsx`): `window.history.pushState` (real paths `/blog`, `/blog/slug`) for SPA navigation after initial load
- **SSG** (`scripts/generate-blog-pages.js`): Generates static HTML at `/dist/blog/{slug}/index.html` for direct URL access and SEO

Every URL in `sitemap-pages.xml` must have a corresponding static file in `dist/`. The `generate-sitemap.js` script reads from `src/data/blogs.json`, which is populated by `generate-blogs.js`. The sitemap is generated into `dist/` after `vite build` completes — it is not committed to source control.

**Key invariant:** `sitemap-pages.xml` is a build artifact. It lives in `dist/` and is deployed by `gh-pages`. It must never be committed to `public/` or tracked in git.
