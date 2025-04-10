import Typewriter from 'typewriter-effect';
import '../static/styles/components/Welcome.css';

function Welcome() {
  return (
    <div className='typewriter-wrapper'>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString('Hi, I\'m Connor Ludwig')
            .pauseFor(1000)
            .deleteAll()
            .typeString('Staff Software Engineer @ Built')
            .pauseFor(1000)
            .deleteAll() 
            .typeString('Scroll to explore')
            .start();
        }}
        options={{
          delay: 50,
        }}
      />
    </div>
  );
}

export default Welcome;
