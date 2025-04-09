import headshot from '../static/images/cjl_headshot.png';
import '../static/styles/components/ContactCard.css';

function Card() {
  return (
    <div className='contact-card-wrapper'>
      <div className="contact-card">
        <div className="top">
          <h2 className="name">Connor J Ludwig</h2>
          <img className="circle-img" src={headshot} alt="avatar_img" />
        </div>
        <div className="bottom">
          <p className="info">
            <b>Cell: </b>
            &emsp;&emsp;(712)-830-6202
          </p>
            <b>Email: </b>
            &emsp;&ensp;<a href = "mailto: cjlludwig@gmail.com">cjlludwig@gmail.com</a>
          <p className="info">
          </p>
          <p className="info">
            <b>Github: </b>
            &emsp;<a href="https://github.com/cjlludwig">https://github.com/cjlludwig</a>
          </p>
          <p className="info">
            <b>Linkedin: </b>
            &nbsp;<a href="www.linkedin.com/in/connor-ludwig/">www.linkedin.com/in/connor-ludwig/</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;