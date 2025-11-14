import resumeData from '../data/resume-data.json'

function Projects() {
  const { projects } = resumeData

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <h2 className="section-title">Key Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-period">{project.period}</p>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-stack">
                <strong>Stack:</strong>
                <div className="tech-tags">
                  {project.stack.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

