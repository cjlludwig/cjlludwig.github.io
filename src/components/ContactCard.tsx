import headshot from '../static/images/cjl_headshot.png';
import '../static/styles/components/ContactCard.css';

function Card() {
  return (
    <div className='contact-card-wrapper'>
      <div className="contact-card">
        <div className="contact-header">
          <img className="profile-img" src={headshot} alt="Connor Ludwig" />
          <div className="header-content">
            <h2 className="name">Connor J Ludwig</h2>
            <p className="title">Staff Software Engineer</p>
          </div>
        </div>
        <div className="contact-content">
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <a href="mailto:cjlludwig@gmail.com">cjlludwig@gmail.com</a>
          </div>
          <div className="contact-item">
            <i className="fab fa-github"></i>
            <a href="https://github.com/cjlludwig" target="_blank" rel="noopener noreferrer">github.com/cjlludwig</a>
          </div>
          <div className="contact-item">
            <i className="fab fa-linkedin"></i>
            <a href="https://www.linkedin.com/in/connor-ludwig/" target="_blank" rel="noopener noreferrer">linkedin.com/in/connor-ludwig</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;