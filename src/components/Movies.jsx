import { useMemo } from 'react'
import { FaStar } from 'react-icons/fa'
import allMovies from './movies-data'

function Movies() {
  // 🎬 Curated Movie List from Letterboxd
  // Filter 5-star ratings and randomly pick 10 for display
  const movies = useMemo(() => {
    const filtered = allMovies.filter(movie => 
      movie.rating === 5
      && !movie.title.includes("La La")
    );
    
    // Shuffle array using Fisher-Yates algorithm
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Return random 10 movies
    return shuffled.slice(0, 10);
  }, []); // Empty dependency array = shuffle only once on mount

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} />);
      } else {
        stars.push(<FaStar key={i} style={{ opacity: 0.2 }} />);
      }
    }
    return stars;
  };

  return (
    <section id="movies" className="section movies">
      <div className="container">
        <h2 className="section-title">Movie Favorites</h2>
        <p className="section-subtitle">
          My top-rated films on Letterboxd
        </p>
        
        <div className="movies-grid">
          {movies.map((movie, index) => (
            <a
              key={index}
              href={movie.url}
              target="_blank"
              rel="noopener noreferrer"
              className="movie-card"
            >
              <div className="movie-poster-wrapper">
                <img 
                  src={movie.poster} 
                  alt={`${movie.title} (${movie.year}) poster`}
                  className="movie-poster"
                  loading="lazy"
                />
                <div className="movie-overlay">
                  <div className="movie-info">
                    <h3 className="movie-title">{movie.title}</h3>
                    {movie.year && <p className="movie-year">{movie.year}</p>}
                    <div className="movie-rating">
                      {renderStars(movie.rating)}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="movies-footer">
          <p>
            Powered by{' '}
            <a 
              href="https://letterboxd.com/cjlludwig/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Letterboxd
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Movies;

