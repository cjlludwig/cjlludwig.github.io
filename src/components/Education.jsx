import resumeData from '../data/resume-data.json'

function Education() {
  const { education } = resumeData
  
  return (
    <section className="section education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div className="education-card">
          <h3 className="education-school">{education.school}</h3>
          <p className="education-location">{education.location}</p>
          <p className="education-degree">Bachelor of Science – Cum Laude</p>
          <p className="education-majors">
            <strong>Majors:</strong> {education.majors}
          </p>
          <p className="education-minor">
            <strong>Minor:</strong> {education.minor}
          </p>
          <p className="education-period">08/2013 – 12/2017</p>
        </div>
      </div>
    </section>
  )
}

export default Education

