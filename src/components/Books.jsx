import { useMemo } from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import allBooks from './books-data'

function Books() {
  // 📚 Curated Reading List
  // Filter and randomly pick 10 books for display
  // To regenerate from Goodreads: node scripts/parse-books.js
  
  const books = useMemo(() => {
    const filtered = allBooks.filter(book => 
      book.rating > 0 && // Has been rated
      book.rating >= 3 && // At least 3 stars
      !book.title.includes("A Court of") && // Skip specific series
      !book.title.includes("How High") &&
      !book.title.includes("North Woods") &&
      !book.title.includes("Sea of Tran") &&
      !book.title.includes("Dark For") &&
      !book.title.includes("Death's End") &&
      !book.title.includes("Endymion") &&
      !book.title.includes("The Fall of") &&
    //   !book.title.includes("Babel") &&
    //   !book.title.includes("The Ancients") &&
      !book.title.includes("The Fourth Con") &&
      !book.title.includes("Extinction") &&
      !book.title.includes("A Psalm for the Wi") &&
      !book.title.includes("Origin") &&
      !book.title.includes("Where the Axe") &&
      !book.title.includes("The Chicago Neighborhood")
    );
    
    // Shuffle array using Fisher-Yates algorithm
    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Return random 10 books
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
    <section className="section books" id="books">
      <div className="container">
        <h2 className="section-title">Reading List</h2>
        <p className="section-subtitle">
          Recent reads across fiction, history, and science
        </p>
        
        <div className="books-grid">
          {books.map((book, index) => (
            <a
              key={index}
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="book-card"
            >
              <div className="book-cover-wrapper">
                <img 
                  src={book.cover} 
                  alt={`${book.title} cover`}
                  className="book-cover"
                  loading="lazy"
                />
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                {/* {book.series && <p className="book-series">{book.series}</p>} */}
                <p className="book-author">{book.author}</p>
                {book.rating > 0 && (
                  <div className="book-rating">
                    {renderStars(book.rating)}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
        
        <div className="books-footer">
          <p>
            Powered by{' '}
            <a 
              href="https://www.goodreads.com/user/show/98014803-connor"
              target="_blank"
              rel="noopener noreferrer"
            >
              Goodreads
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Books;

