import { FaGithub, FaLinkedin, FaDownload, FaGlobe } from 'react-icons/fa'
import resumeData from '../data/resume-data.json'

function Hero() {
  const { personal } = resumeData
  
  const iconMap = {
    'Website': <FaGlobe />,
    'GitHub': <FaGithub />,
    'LinkedIn': <FaLinkedin />
  }
  
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">{personal.name}</h1>
          <h2 className="hero-subtitle">{personal.title}</h2>
          <p className="hero-location">{personal.location}</p>
          
          <div className="hero-links">
            {personal.links.map((link, index) => (
              <a 
                key={index}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hero-link"
              >
                {iconMap[link.text]} {link.text}
              </a>
            ))}
            <a 
              href="/resume.pdf" 
              download
              className="hero-link hero-link-primary"
            >
              <FaDownload /> Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

