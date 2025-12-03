import { useEffect } from 'react'

const SITE_URL = 'https://cjlludwig.github.io'
const STRUCTURED_DATA_ID = 'structured-data'

function upsertMeta(attribute, key, content) {
  const selector = `meta[${attribute}="${key}"]`
  const existing = document.head.querySelector(selector)

  if (!content) {
    if (existing) existing.remove()
    return
  }

  const meta = existing ?? document.createElement('meta')
  meta.setAttribute(attribute, key)
  meta.setAttribute('content', content)

  if (!existing) {
    document.head.appendChild(meta)
  }
}

function updateStructuredData(jsonLd) {
  const selector = `script[data-seo="${STRUCTURED_DATA_ID}"]`
  const existing = document.head.querySelector(selector)

  if (!jsonLd) {
    if (existing) existing.remove()
    return
  }

  const script = existing ?? document.createElement('script')
  script.type = 'application/ld+json'
  script.dataset.seo = STRUCTURED_DATA_ID
  script.textContent = JSON.stringify(jsonLd)

  if (!existing) {
    document.head.appendChild(script)
  }
}

function Seo({ title, description, type = 'website', image, url, jsonLd }) {
  useEffect(() => {
    if (title) {
      document.title = title
    }

    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:url', url ?? SITE_URL)
    upsertMeta('property', 'og:image', image)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)

    updateStructuredData(jsonLd)

    return () => {
      updateStructuredData(null)
    }
  }, [title, description, type, image, url, jsonLd])

  return null
}

export default Seo
