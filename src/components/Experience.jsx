import { useEffect, useRef } from 'react'
import resumeData from '../data/resume-data.json'

function Experience() {
  const experiences = resumeData.experience.filter(exp =>
    !exp.title.includes('Internship')
  )
  const timelineRef = useRef(null)

  // Drives the progress line via --timeline-progress CSS variable
  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return

    const updateProgress = () => {
      const rect = timeline.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1,
        (window.innerHeight * 0.5 - rect.top) / rect.height
      ))
      timeline.style.setProperty('--timeline-progress', progress.toString())
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  // Lights up each dot as its card scrolls into view
  useEffect(() => {
    const cards = timelineRef.current?.querySelectorAll('.experience-card')
    if (!cards) return

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('timeline-active')
      }),
      { rootMargin: '0px 0px -15% 0px', threshold: 0.1 }
    )

    cards.forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="experience-timeline" ref={timelineRef}>
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
