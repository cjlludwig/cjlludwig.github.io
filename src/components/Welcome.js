import Typewriter from 'typewriter-effect';
import '../static/styles/components/Welcome.css';

function Welcome() {
  return (
    <div className='typewriter-wrapper'>
      <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString('Hello!')
            .pauseFor(300)
            .deleteAll()
            .typeString("\nMy name's Connor.<br>")
            .pauseFor(300)
            .typeString("\nWelcome to my site!<br>")
            .pauseFor(2000)
            .typeString("\nScroll on for more...")
            .start();
        }}
      />
    </div>
  );
}

export default Welcome;

