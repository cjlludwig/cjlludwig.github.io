import { useEffect, useMemo, useRef, useState } from 'react'
import { FaGithub, FaLinkedin, FaDownload, FaMoon, FaSun } from 'react-icons/fa'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Books from './components/Books'
import Movies from './components/Movies'
import Music from './components/Music'
import GitHub from './components/GitHub'
import Certifications from './components/Certifications'
import Education from './components/Education'
import BlogIndex from './components/BlogIndex'
import BlogPost from './components/BlogPost'
import Seo from './components/Seo'
import blogsData from './data/blogs.json'
import {
  initAnalytics,
  trackFileDownload,
  trackPageView,
  trackSocialProfile,
} from './utils/analytics'

const posts = blogsData.posts || []

const SITE_URL = 'https://cjlludwig.github.io'

const defaultMeta = {
  title: 'Connor Ludwig | Senior Staff Software Engineer',
  description:
    'Senior Staff Software Engineer passionate about building performant platforms, reliable systems, and delightful developer experiences.',
}

function getRouteFromHash(hash) {
  const sanitized = hash.replace(/^#/, '')
  if (!sanitized || sanitized === '/') {
    return { page: 'home' }
  }

  const parts = sanitized.split('/').filter(Boolean)
  if (parts[0] === 'blog') {
    if (parts[1]) return { page: 'post', slug: parts[1] }
    return { page: 'blog' }
  }

  return { page: 'home' }
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check system preference first
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true
    }
    // Check localStorage
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    // Update document class and localStorage when darkMode changes
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const [route, setRoute] = useState(() => getRouteFromHash(window.location.hash))
  const lastTrackedPath = useRef(null)

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRouteFromHash(window.location.hash))
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const activePost = useMemo(
    () => posts.find((post) => post.slug === route.slug),
    [route.slug],
  )

  const pageMeta = useMemo(() => {
    if (route.page === 'post' && activePost) {
      return {
        title: `${activePost.title} | Connor Ludwig`,
        description: activePost.description,
        image: activePost.image,
        date: activePost.date,
        url: `${SITE_URL}/#/blog/${activePost.slug}`,
        type: 'article',
      }
    }
    if (route.page === 'blog') {
      return {
        title: 'Blog | Connor Ludwig',
        description: 'Short engineering notes, diagrams, and stories.',
        url: `${SITE_URL}/#/blog`,
      }
    }
    return { ...defaultMeta, url: SITE_URL }
  }, [route.page, activePost])

  const pageViewPath = useMemo(() => {
    if (route.page === 'home') return '/'
    if (route.page === 'blog') return '/blog'
    if (route.page === 'post' && activePost) return `/blog/${activePost.slug}`
    return null
  }, [route.page, activePost])

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    if (!pageViewPath) return
    if (lastTrackedPath.current === pageViewPath) return

    trackPageView(pageViewPath, pageMeta.title)
    lastTrackedPath.current = pageViewPath
  }, [pageMeta.title, pageViewPath])

  return (
    <div className="app">
      <Seo
        title={pageMeta.title}
        description={pageMeta.description}
        image={pageMeta.image}
        type={pageMeta.type}
        url={pageMeta.url}
        jsonLd={
          route.page === 'post' && activePost
            ? {
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: activePost.title,
                datePublished: activePost.date,
                description: activePost.description,
                image: activePost.image,
                url: `${SITE_URL}/#/blog/${activePost.slug}`,
              }
            : null
        }
      />

      {/* Header with navigation */}
      <header className="header">
        <div className="container">
          <nav className="nav">
            <div className="nav-brand">
              <a href="#/" className="brand-link">
                Connor Ludwig
              </a>
            </div>
            <div className="nav-links">
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#/blog" className="nav-blog">
                Blog
              </a>
              <span className="nav-separator">|</span>
              <a href="#books" className="nav-fun">
                Fun Stuff
              </a>
              <button 
                onClick={toggleDarkMode} 
                className="theme-toggle"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main>
        {route.page === 'blog' ? (
          <BlogIndex posts={posts} />
        ) : route.page === 'post' && activePost ? (
          <BlogPost post={activePost} />
        ) : (
          <>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Certifications />
            <Education />
            <GitHub />
            <BlogIndex posts={posts} />
            <Books />
            <Movies />
            <Music />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-links">
              <a
                href="https://github.com/cjlludwig"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                onClick={() => trackSocialProfile('GitHub', 'https://github.com/cjlludwig')}
              >
                <FaGithub /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/connor-ludwig"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                onClick={() =>
                  trackSocialProfile('LinkedIn', 'https://linkedin.com/in/connor-ludwig')
                }
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a
                href="/resume.pdf"
                download
                className="footer-link"
                onClick={() => trackFileDownload('/resume.pdf')}
              >
                <FaDownload /> Download Resume
              </a>
            </div>
            <p className="footer-copyright">
              © {new Date().getFullYear()} Connor Ludwig. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

