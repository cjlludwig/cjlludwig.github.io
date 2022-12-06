import headshot from '../static/images/headshot.jpg';
import '../static/components/ContactCard.css';

function Card() {
  return (
    <div className='card-wrapper'>
      <div className="card">
        <div className="top">
          <h2 className="name">Connor J Ludwig</h2>
          <img className="circle-img" src={headshot} alt="avatar_img" />
        </div>
        <div className="bottom">
          <p className="info">
            <b>Cell: </b>
            (XXX)-XXX-XXXX
          </p>
          <p className="info">
            <b>Email: </b>
            <a href = "mailto: cjlludwig@gmail.com">cjlludwig@gmail.com</a>
          </p>
          <p className="info">
            <b>Linkedin: </b>
            <a href="www.linkedin.com/in/connor-ludwig/">www.linkedin.com/in/connor-ludwig/</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;