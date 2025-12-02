import { useState, useEffect, useMemo } from 'react'
import { FaGithub, FaLinkedin, FaDownload, FaMoon, FaSun } from 'react-icons/fa'
import { Helmet } from 'react-helmet-async'
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
import blogsData from './data/blogs.json'

const posts = blogsData.posts || []

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
      }
    }
    if (route.page === 'blog') {
      return {
        title: 'Blog | Connor Ludwig',
        description: 'Short engineering notes, diagrams, and stories.',
      }
    }
    return defaultMeta
  }, [route.page, activePost])

  return (
    <div className="app">
      <Helmet>
        <title>{pageMeta.title}</title>
        <meta name="description" content={pageMeta.description} />
        <meta property="og:title" content={pageMeta.title} />
        <meta property="og:description" content={pageMeta.description} />
        <meta property="og:type" content={route.page === 'post' ? 'article' : 'website'} />
        {pageMeta.image ? <meta property="og:image" content={pageMeta.image} /> : null}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageMeta.title} />
        <meta name="twitter:description" content={pageMeta.description} />
        {pageMeta.image ? <meta name="twitter:image" content={pageMeta.image} /> : null}
        {route.page === 'post' && activePost ? (
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: activePost.title,
              datePublished: activePost.date,
              description: activePost.description,
              image: activePost.image,
              url: `https://cjlludwig.github.io/#/blog/${activePost.slug}`,
            })}
          </script>
        ) : null}
      </Helmet>

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
              <a href="#/blog">Blog</a>
              <span className="nav-separator">|</span>
              <a href="#books" className="nav-fun">Books</a>
              <a href="#movies" className="nav-fun">Movies</a>
              <a href="#music" className="nav-fun">Music</a>
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
              >
                <FaGithub /> GitHub
              </a>
              <a 
                href="https://linkedin.com/in/connor-ludwig" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a 
                href="/resume.pdf" 
                download
                className="footer-link"
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

