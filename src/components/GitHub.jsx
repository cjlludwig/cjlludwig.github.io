import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { trackSocialProfile } from '../utils/analytics'

function GitHub() {
  const githubUsername = 'cjlludwig'
  const githubUrl = `https://github.com/${githubUsername}`

  // Use locally cached SVGs (generated at build time)
  const statsUrl = '/images/github/stats.svg'
  const languagesUrl = '/images/github/languages.svg'

  const [statsError, setStatsError] = useState(false)
  const [languagesError, setLanguagesError] = useState(false)

  return (
    <section className="section github">
      <div className="container">
        <h2 className="section-title">
          <FaGithub className="github-icon" /> Open Source Activity
        </h2>

        <div className="github-content">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
            onClick={() => trackSocialProfile('GitHub', githubUrl)}
          >
            <div className="github-profile-card">
              <img
                src={`https://github.com/${githubUsername}.png`}
                alt={githubUsername}
                className="github-avatar"
              />
              <div className="github-profile-info">
                <h3>@{githubUsername}</h3>
                <p>View full profile on GitHub</p>
              </div>
              <FaGithub className="github-arrow-icon" />
            </div>
          </a>

          <div className="github-stats-grid">
            {!statsError ? (
              <div className="github-stat-item">
                <img
                  src={statsUrl}
                  alt="GitHub Stats"
                  className="github-stat-card"
                  loading="lazy"
                  onError={() => setStatsError(true)}
                />
              </div>
            ) : null}

            {!languagesError ? (
              <div className="github-stat-item">
                <img
                  src={languagesUrl}
                  alt="Top Languages"
                  className="github-stat-card"
                  loading="lazy"
                  onError={() => setLanguagesError(true)}
                />
              </div>
            ) : null}
          </div>

          <div className="github-cta">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="github-button"
              onClick={() => trackSocialProfile('GitHub', githubUrl)}
            >
              <FaGithub /> View All Repositories
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GitHub

