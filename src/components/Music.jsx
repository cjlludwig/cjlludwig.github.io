import { FaSpotify } from 'react-icons/fa'

function Music() {
  // Your favorite tracks from Spotify
  const albums = [
    {
      name: "Stick Season",
      artist: "Noah Kahan",
      image: "https://i.scdn.co/image/ab67616d00001e026ee35072df1af802cca09918",
      url: "https://open.spotify.com/album/50ZenUP4O2Q5eCy2NRNvuz"
    },
    {
      name: "Jericho",
      artist: "The Band",
      image: "https://i.scdn.co/image/ab67616d00001e0213fec6abc8b16b53bce2a14e",
      url: "https://open.spotify.com/album/0RLw5OMSYJ9FNUJvBTfHzU"
    },
    {
      name: "Music From Big Pink",
      artist: "The Band",
      image: "https://i.scdn.co/image/ab67616d00001e0220bbceac6950d3fe13fa13c3",
      url: "https://open.spotify.com/album/0ky5kdvfPxSmSpj03hpSAE"
    },
    {
      name: "Moondance",
      artist: "Van Morrison",
      image: "https://i.scdn.co/image/ab67616d00001e02d828b182ee9b7193a0f8b5d6",
      url: "https://open.spotify.com/album/5PfnCqRbdfIDMb1x3MPQam"
    },
    {
      name: "America",
      artist: "America",
      image: "https://i.scdn.co/image/ab67616d00001e02afb855e6461310dff4046c56",
      url: "https://open.spotify.com/album/0E5IKYhiKgbYQkmfsFonbZ"
    },
    {
      name: "American IV",
      artist: "Johnny Cash",
      image: "https://i.scdn.co/image/ab67616d00001e026f4f62da3d811b6501a69ffa",
      url: "https://open.spotify.com/album/2BlL4Gv2DLPu8p58Wcmlm9"
    },
    {
      name: "All Things Must Pass",
      artist: "George Harrison",
      image: "https://i.scdn.co/image/ab67616d00001e02acc11d868a59008935e72299",
      url: "https://open.spotify.com/album/4I4xtHaIFOzhZfp1NIHkY6"
    },
    {
      name: "Can't Buy A Thrill",
      artist: "Steely Dan",
      image: "https://i.scdn.co/image/ab67616d00001e025a9b9e265814a9c9636a71a4",
      url: "https://open.spotify.com/album/4Gh6pRaXqXTtJx4plAJbBw"
    },
    {
      name: "Let It Be",
      artist: "The Beatles",
      image: "https://i.scdn.co/image/ab67616d00001e0284243a01af3c77b56fe01ab1",
      url: "https://open.spotify.com/album/0jTGHV5xqHPvEcwL8f6YU5"
    },
    {
      name: "Night Moves",
      artist: "Bob Seger",
      image: "https://i.scdn.co/image/ab67616d00001e02676a8230a422123e8012557e",
      url: "https://open.spotify.com/album/5QkOpsZupEPLq186YOrBNe"
    }
  ]

  return (
    <section className="section music">
      <div className="container">
        <h2 className="section-title">Currently Spinning</h2>
        <p className="music-subtitle">
          <FaSpotify className="spotify-icon" /> My favorite albums on rotation
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
      </div>
    </section>
  )
}

export default Music

