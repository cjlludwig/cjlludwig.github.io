import headshot from '../static/images/Headshot.PNG';
import '../static/styles/components/ContactCard.css';

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
            <b>Email: </b>
            <a href = "mailto: cjlludwig@gmail.com">cjlludwig@gmail.com</a>
          <p className="info">
          </p>
          <p className="info">
            <b>Github: </b>
            <a href="https://github.com/cjlludwig">https://github.com/cjlludwig</a>
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