import { useMemo } from 'react'
import { FaSpotify } from 'react-icons/fa'
import { albums as allAlbums } from './music-data'

function Music() {
  const albums = useMemo(() => {
    const shuffled = [...allAlbums]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled.slice(0, 10)
  }, [])

  return (
    <section id="music" className="section music">
      <div className="container">
        <h2 className="section-title">Currently Spinning</h2>
        <p className="section-subtitle music-subtitle">
          My favorite albums on rotation
        </p>

        <div className="album-wall">
          {albums.map((album, index) => (
            <a
              key={index}
              href={album.url}
              target="_blank"
              rel="noopener noreferrer"
              className="album-cover"
            >
              <div className="album-image-wrapper">
                <img src={album.image} alt={`${album.name} by ${album.artist}`} />
                <div className="album-overlay">
                  <div className="album-info">
                    <p className="album-name">{album.name}</p>
                    <p className="album-artist">{album.artist}</p>
                  </div>
                  <FaSpotify className="spotify-play-icon" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="music-footer">
          <p>
            Powered by{' '}
            <a
              href="https://open.spotify.com/user/121782208"
              target="_blank"
              rel="noopener noreferrer"
            >
              Spotify
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Music
