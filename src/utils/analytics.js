const GA_MEASUREMENT_ID = 'G-DF08RM7MCG'
const isProd = import.meta.env.PROD

let initialized = false

function ensureGtag() {
  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }
}

export function initAnalytics() {
  if (!isProd || initialized) return

  ensureGtag()

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false })

  initialized = true
}

export function trackPageView(path, title) {
  if (!isProd || !initialized) return

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: `${window.location.origin}${path}`,
  })
}

export function trackFileDownload(filePath) {
  if (!isProd || !initialized) return

  const url = new URL(filePath, window.location.origin)

  window.gtag('event', 'file_download', {
    file_name: url.pathname.split('/').pop(),
    link_url: url.href,
  })
}

export function trackSocialProfile(profileName, url) {
  if (!isProd || !initialized) return

  window.gtag('event', 'select_content', {
    content_type: 'social_profile',
    item_id: profileName,
    link_url: url,
  })
}
