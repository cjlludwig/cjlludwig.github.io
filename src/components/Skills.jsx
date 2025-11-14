import resumeData from '../data/resume-data.json'

function Skills() {
  const { skills } = resumeData
  
  // Convert skills object to array format
  const skillCategories = Object.entries(skills).map(([category, skillList]) => ({
    category,
    skills: skillList
  }))

  // ATS-optimized keyword list
  const atsKeywords = [
    "Staff Software Engineer",
    "Senior Staff Engineer",
    "Distributed Systems",
    "Cloud Architecture",
    "Event-Driven Systems",
    "Microservices",
    "Technical Leadership",
    "Engineering Leadership",
    "Scalable Systems",
    "High-Throughput Systems",
    "Real-Time Processing",
    "FinTech",
    "AWS Solutions",
    "System Design",
    "API Design",
    "Full-Stack Development",
    "Backend Development",
    "Team Leadership",
    "Cross-Functional Collaboration",
    "Agile Development"
  ]

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        
        <div className="skills-matrix">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="skill-category-title">{category.category}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ATS-optimized keyword section (visually hidden but crawlable) */}
        <div className="ats-keywords" aria-hidden="true">
          <h3>Core Competencies</h3>
          <div className="ats-keyword-list">
            {atsKeywords.map((keyword, idx) => (
              <span key={idx}>{keyword}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

