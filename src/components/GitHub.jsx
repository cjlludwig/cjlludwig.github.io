import { useMemo, useState } from 'react'
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa'

function GitHub() {
  const githubUsername = 'cjlludwig'
  const githubUrl = `https://github.com/${githubUsername}`

  const statsUrl = useMemo(
    () =>
      `https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=1e293b&title_color=3b82f6&icon_color=3b82f6&text_color=cbd5e1&hide_rank=true&cache_seconds=21600`,
    [githubUsername]
  )

  const languagesUrl = useMemo(
    () =>
      `https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=tokyonight&hide_border=true&bg_color=1e293b&title_color=3b82f6&text_color=cbd5e1&card_width=300&cache_seconds=21600`,
    [githubUsername]
  )

  const [statsUnavailable, setStatsUnavailable] = useState(false)
  const [languagesUnavailable, setLanguagesUnavailable] = useState(false)

  const renderFallback = (title, href) => (
    <div className="github-stat-fallback">
      <p>{title} are temporarily unavailable.</p>
      <a href={href} target="_blank" rel="noopener noreferrer" className="github-fallback-link">
        Open on GitHub
      </a>
    </div>
  )

  return (
    <section className="section github">
      <div className="container">
        <h2 className="section-title">
          <FaGithub className="github-icon" /> Open Source Activity
        </h2>
        
        <div className="github-content">
          {/* Profile Card */}
          <a 
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
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

          {/* Compact Stats Grid */}
          <div className="github-stats-grid">
            <div className="github-stat-item">
              {statsUnavailable ? (
                renderFallback('GitHub stats', statsUrl)
              ) : (
                <img
                  src={statsUrl}
                  alt="GitHub Stats"
                  className="github-stat-card"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setStatsUnavailable(true)}
                />
              )}
            </div>

            <div className="github-stat-item">
              {languagesUnavailable ? (
                renderFallback('Top languages', languagesUrl)
              ) : (
                <img
                  src={languagesUrl}
                  alt="Top Languages"
                  className="github-stat-card"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setLanguagesUnavailable(true)}
                />
              )}
            </div>
          </div>

          {/* Call to action */}
          <div className="github-cta">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="github-button"
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

