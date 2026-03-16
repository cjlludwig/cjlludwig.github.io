import { FaGithub, FaLinkedin, FaDownload, FaGlobe } from 'react-icons/fa'
import { trackFileDownload, trackSocialProfile } from '../utils/analytics'
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
          <div className="hero-photo-wrap">
            <img
              src="/images/headshot copy.jpg"
              alt="Connor Ludwig"
              className="hero-photo"
            />
          </div>
          <div className="hero-text">
            <h1 className="hero-title">{personal.name}</h1>
            <h2 className="hero-subtitle">{personal.title}</h2>
            <p className="hero-location">{personal.location}</p>

            <div className="hero-links">
              {personal.links.filter(l => l.text !== "Website").map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-link"
                  onClick={() =>
                    ['GitHub', 'LinkedIn'].includes(link.text) &&
                    trackSocialProfile(link.text, link.url)
                  }
                >
                  {iconMap[link.text]} {link.text}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download
                className="hero-link hero-link-primary"
                onClick={() => trackFileDownload('/resume.pdf')}
              >
                <FaDownload /> Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

