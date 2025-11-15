import { useState, useEffect } from 'react'
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

  return (
    <div className="app">
      {/* Header with navigation */}
      <header className="header">
        <div className="container">
          <nav className="nav">
            <div className="nav-brand">Connor Ludwig</div>
            <div className="nav-links">
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
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
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Education />
        <GitHub />
        <Books />
        <Movies />
        <Music />
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

