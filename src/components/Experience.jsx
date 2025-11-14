import resumeData from '../data/resume-data.json'

function Experience() {
  // Filter out internships to keep the main experience section clean
  const experiences = resumeData.experience.filter(exp => 
    !exp.title.includes('Internship')
  )

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-card">
              <div className="experience-header">
                <div>
                  <h3 className="experience-title">{exp.title}</h3>
                  <p className="experience-company">{exp.company}</p>
                  <p className="experience-location">{exp.location}</p>
                </div>
                <p className="experience-period">{exp.period}</p>
              </div>
              <ul className="experience-achievements">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

