import resumeData from '../data/resume-data.json'

function Certifications() {
  const { certifications, awards } = resumeData

  return (
    <section className="section certifications">
      <div className="container">
        <h2 className="section-title">Certifications & Awards</h2>
        <div className="cert-awards-grid">
          <div className="cert-column">
            <h3 className="subsection-title">Certifications</h3>
            <ul className="cert-list">
              {certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
          <div className="cert-column">
            <h3 className="subsection-title">Awards</h3>
            <ul className="cert-list">
              {awards.map((award, index) => (
                <li key={index}>{award}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certifications

