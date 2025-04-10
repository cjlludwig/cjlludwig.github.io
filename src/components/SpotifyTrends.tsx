import { useEffect, useState, useMemo } from 'react';
import { getTopTracks } from "../services/spotifyService"
import { Track } from '../models/tracks';
import { Card, ProgressBar, Row, Col, Badge, Button, Tabs, Tab, Container } from 'react-bootstrap';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';

import Carousel from 'react-multi-carousel';

import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/styles/components/SpotifyTrends.css';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement);

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

// Helper function to get color based on popularity
function getPopularityColor(popularity: number) {
  if (popularity >= 80) return '#A3B18A'; // Project theme green for high popularity
  if (popularity >= 60) return '#588157';
  if (popularity >= 40) return '#3A5A40';
  if (popularity >= 20) return '#344E41';
  return '#DAD7CD'; // Light color for low popularity
}

function SpotifyTrends() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [activeTab, setActiveTab] = useState('carousel');
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

  // Data analysis using useMemo to avoid recalculating on every render
  const trackAnalysis = useMemo(() => {
    if (!tracks.length) return null;

    // Artist frequency analysis
    const artistFrequency: Record<string, number> = {};
    tracks.forEach(track => {
      const artistName = track.artists?.[0]?.name || 'Unknown';
      artistFrequency[artistName] = (artistFrequency[artistName] || 0) + 1;
    });

    // Sort artists by frequency
    const sortedArtists = Object.entries(artistFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Popularity distribution
    const popularityRanges = {
      '0-20': 0,
      '21-40': 0,
      '41-60': 0,
      '61-80': 0,
      '81-100': 0
    };

    tracks.forEach(track => {
      if (track.popularity <= 20) popularityRanges['0-20']++;
      else if (track.popularity <= 40) popularityRanges['21-40']++;
      else if (track.popularity <= 60) popularityRanges['41-60']++;
      else if (track.popularity <= 80) popularityRanges['61-80']++;
      else popularityRanges['81-100']++;
    });

    // Average popularity
    const avgPopularity = tracks.reduce((sum, track) => sum + track.popularity, 0) / tracks.length;

    // Most popular track
    const mostPopularTrack = [...tracks].sort((a, b) => b.popularity - a.popularity)[0];

    return {
      artistFrequency: sortedArtists,
      popularityRanges,
      avgPopularity,
      mostPopularTrack
    };
  }, [tracks]);

  // Chart data for artist frequency
  const artistChartData = useMemo(() => {
    if (!trackAnalysis) return null;

    return {
      labels: trackAnalysis.artistFrequency.map(([artist]) => artist),
      datasets: [
        {
          label: 'Number of Tracks',
          data: trackAnalysis.artistFrequency.map(([, count]) => count),
          backgroundColor: [
            'rgba(163, 177, 138, 0.7)', // Project theme green
            'rgba(88, 129, 87, 0.7)',
            'rgba(58, 90, 64, 0.7)',
            'rgba(52, 78, 65, 0.7)',
            'rgba(218, 215, 205, 0.7)',
          ],
          borderColor: [
            'rgba(163, 177, 138, 1)',
            'rgba(88, 129, 87, 1)',
            'rgba(58, 90, 64, 1)',
            'rgba(52, 78, 65, 1)',
            'rgba(218, 215, 205, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [trackAnalysis]);

  // Chart data for popularity distribution
  const popularityChartData = useMemo(() => {
    if (!trackAnalysis) return null;

    return {
      labels: Object.keys(trackAnalysis.popularityRanges),
      datasets: [
        {
          label: 'Number of Tracks',
          data: Object.values(trackAnalysis.popularityRanges),
          backgroundColor: [
            'rgba(218, 215, 205, 0.7)', // Light color
            'rgba(52, 78, 65, 0.7)', // Dark green
            'rgba(58, 90, 64, 0.7)', // Medium green
            'rgba(88, 129, 87, 0.7)', // Light green
            'rgba(163, 177, 138, 0.7)', // Accent green
          ],
          borderColor: [
            'rgba(218, 215, 205, 1)',
            'rgba(52, 78, 65, 1)',
            'rgba(58, 90, 64, 1)',
            'rgba(88, 129, 87, 1)',
            'rgba(163, 177, 138, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [trackAnalysis]);

  // Chart data for popularity trend
  const popularityTrendData = useMemo(() => {
    if (!tracks.length) return null;

    // Sort tracks by popularity
    const sortedTracks = [...tracks].sort((a, b) => a.popularity - b.popularity);
    
    return {
      labels: sortedTracks.map((_, index) => `Track ${index + 1}`),
      datasets: [
        {
          label: 'Popularity',
          data: sortedTracks.map(track => track.popularity),
          borderColor: 'rgba(163, 177, 138, 1)',
          backgroundColor: 'rgba(163, 177, 138, 0.2)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }, [tracks]);

  // Chart options to match project theme
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#DAD7CD',
        }
      },
      title: {
        display: true,
        color: '#E9EDC9',
      }
    },
    scales: {
      y: {
        ticks: {
          color: '#DAD7CD',
        },
        grid: {
          color: 'rgba(218, 215, 205, 0.1)',
        }
      },
      x: {
        ticks: {
          color: '#DAD7CD',
        },
        grid: {
          color: 'rgba(218, 215, 205, 0.1)',
        }
      }
    }
  };

  return (
    <div className="spotify-section">
      <h2 className="section-title">My Top Spotify Tracks</h2>
      <div className='spotify-trends-container'>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => k && setActiveTab(k)}
          className="mb-4"
        >
          <Tab eventKey="carousel" title="Track Carousel">
            <Carousel
              swipeable={isMobile}
              draggable={false}
              showDots={!isMobile}
              responsive={responsive}
              infinite={isMobile}
              autoPlay={isMobile ? true : false}
              autoPlaySpeed={10000}
              keyBoardControl={true}
              containerClass="carousel-container"
              arrows={!isMobile}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {
                tracks.map((track, i) => {
                  const imageSrc = track?.album?.images?.[0].url;
                  const popularity = track.popularity;
                  const popularityColor = getPopularityColor(popularity);
                  
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
                                style={{ backgroundColor: `${popularityColor}20` }}
                              >
                                <ProgressBar
                                  animated
                                  variant={determineTrendiness(popularity)}
                                  now={popularity}
                                  style={{ backgroundColor: popularityColor }}
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
          </Tab>
          
          <Tab eventKey="analytics" title="Analytics Dashboard">
            {trackAnalysis && (
              <div className="analytics-dashboard">
                <Row className="mb-4">
                  <Col md={6}>
                    <Card className="h-100">
                      <Card.Header>Top Artists</Card.Header>
                      <Card.Body>
                        {artistChartData && (
                          <Bar 
                            data={artistChartData} 
                            options={{
                              ...chartOptions,
                              plugins: {
                                ...chartOptions.plugins,
                                title: {
                                  ...chartOptions.plugins.title,
                                  text: 'Artist Frequency in Top Tracks'
                                }
                              }
                            }}
                          />
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="h-100">
                      <Card.Header>Popularity Distribution</Card.Header>
                      <Card.Body>
                        {popularityChartData && (
                          <Pie 
                            data={popularityChartData} 
                            options={{
                              ...chartOptions,
                              plugins: {
                                ...chartOptions.plugins,
                                title: {
                                  ...chartOptions.plugins.title,
                                  text: 'Track Popularity Distribution'
                                }
                              }
                            }}
                          />
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                
                <Row className="mb-4">
                  <Col md={12}>
                    <Card>
                      <Card.Header>Popularity Trend</Card.Header>
                      <Card.Body>
                        {popularityTrendData && (
                          <Line 
                            data={popularityTrendData} 
                            options={{
                              ...chartOptions,
                              plugins: {
                                ...chartOptions.plugins,
                                title: {
                                  ...chartOptions.plugins.title,
                                  text: 'Popularity Trend Across Tracks'
                                }
                              }
                            }}
                          />
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Card className="h-100">
                      <Card.Header>Statistics</Card.Header>
                      <Card.Body>
                        <div className="stats-container">
                          <div className="stat-item">
                            <h4>Average Popularity</h4>
                            <div className="stat-value">{trackAnalysis.avgPopularity.toFixed(1)}</div>
                          </div>
                          <div className="stat-item">
                            <h4>Total Tracks</h4>
                            <div className="stat-value">{tracks.length}</div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="h-100">
                      <Card.Header>Most Popular Track</Card.Header>
                      <Card.Body>
                        {trackAnalysis.mostPopularTrack && (
                          <div className="most-popular-track">
                            <img 
                              src={trackAnalysis.mostPopularTrack.album.images?.[0].url} 
                              alt={trackAnalysis.mostPopularTrack.name}
                              className="most-popular-img"
                            />
                            <div className="most-popular-info">
                              <h4>{trackAnalysis.mostPopularTrack.name}</h4>
                              <p>{trackAnalysis.mostPopularTrack.artists?.[0].name}</p>
                              <Badge bg="success" style={{ backgroundColor: '#A3B18A' }}>Popularity: {trackAnalysis.mostPopularTrack.popularity}</Badge>
                              <Button 
                                variant="outline-success" 
                                size="sm" 
                                className="mt-2"
                                href={trackAnalysis.mostPopularTrack.external_urls.spotify}
                                target="_blank"
                                style={{ 
                                  borderColor: '#A3B18A', 
                                  color: '#A3B18A' 
                                }}
                              >
                                Listen on Spotify
                              </Button>
                            </div>
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default SpotifyTrends;
