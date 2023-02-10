import { useEffect, useState } from 'react';
import { getTopTracks } from "../services/spotifyService"
import { Track } from '../models/tracks';
import { Card, ProgressBar } from 'react-bootstrap';

import Carousel from 'react-multi-carousel';

import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/styles/components/SpotifyTrends.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

function determineTrendiness(popularity: number) {
  if (popularity <= 10) return "10";
  if (popularity <= 20) return "20"; 
  if (popularity <= 30) return "30";
  if (popularity <= 40) return "40"; 
  if (popularity <= 50) return "50"; 
  if (popularity <= 60) return "60";
  if (popularity <= 70) return "70";
  if (popularity <= 80) return "80";
  if (popularity <= 90) return "90"; 
  if (popularity <= 100) return "100"; 
}


function SpotifyTrends() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const isMobile = window.innerWidth <= 960; // Common mobile cutoff

  useEffect(() => {
    async function downloadTopTracks() {
      const tracks = getTopTracks();
      setTracks(tracks);
    }
    downloadTopTracks();
  }, []);

  function trimName(name: string) {
    if (isMobile && name.length > 26) return `${name.slice(0, 26)}...`;
    if (name.length > 35) return `${name.slice(0, 35)}...`;
    return name;
  }

  return (
    <div className='spotify-trends-container'>
      <Carousel
        swipeable={isMobile}
        draggable={false}
        showDots={!isMobile}
        responsive={responsive}
        infinite={isMobile}
        autoPlay={isMobile ? true : false}
        autoPlaySpeed={10000}
        keyBoardControl={true}
        // customTransition="all .5"
        // transitionDuration={1000}
        containerClass="carousel-container"
        arrows={!isMobile}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {
          tracks.map((track, i) => {
            const imageSrc = track?.album?.images?.[0].url;
            const popularity = track.popularity;
            return (
              <Card className='spotify-track-card' key={`spotify-trend-${i}`}>
                  <Card.Img
                    variant='top'
                    src={imageSrc}
                    className="spotify-album-img"
                  />
                <Card.Header>
                  <a href={track?.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
                    <b>{`#${i + 1} ${trimName(track.name)}`}</b>
                  </a>
                </Card.Header>
                <a href={track?.artists?.[0].external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  <Card.Subtitle className='spotify-subtitle'>{track.artists?.[0].name}</Card.Subtitle>
                </a>
                <Card.Body>
                  <div className='spotify-body-contents'>
                    <>
                      <span className='spotify-trend-meter'>
                        Popularity
                        <div
                          className='spotify-trend-meter-bar'
                        >
                          <ProgressBar
                            animated
                            variant={determineTrendiness(popularity)}
                            now={popularity}
                          />
                        </div>
                      </span>
                      <audio controls={true} className="spotify-song-preview">
                        <source src={track.preview_url} type="audio/mpeg" />
                      </audio>
                    </>
                  </div>
                </Card.Body>
              </Card>
            )
          })
        }
      </Carousel>
    </div>
  );
}

export default SpotifyTrends;
