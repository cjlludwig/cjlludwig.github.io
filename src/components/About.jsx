import resumeData from '../data/resume-data.json'

function About() {
  const { summary } = resumeData
  
  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-title">About</h2>
        <div className="about-content">
          <p className="about-text">
            {summary}
          </p>
          
          <div className="about-highlights">
            <div className="highlight-card">
              <h3 className="highlight-number">$15M+</h3>
              <p className="highlight-text">Revenue Impact</p>
            </div>
            <div className="highlight-card">
              <h3 className="highlight-number">8+ Years</h3>
              <p className="highlight-text">Experience</p>
            </div>
            <div className="highlight-card">
              <h3 className="highlight-number">100K+</h3>
              <p className="highlight-text">IoT Devices Supported</p>
            </div>
            <div className="highlight-card">
              <h3 className="highlight-number">99.999%</h3>
              <p className="highlight-text">System SLA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

