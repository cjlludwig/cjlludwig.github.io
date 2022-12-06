import logo from './static/images/logo.svg';
import nodeLogo from './static/images/Node.js_logo.svg';
import gitLogo from './static/images/GitHub_Logo.png';
import dockerLogo from './static/images/docker.svg';
import vsCodeLogo from './static/images/vscode.svg';
import personalLogo from './static/images/logo_transparent512.png';
import ContactCard from './components/ContactCard';
import './static/pages/App.css';

function App() {
  return (
    <div className="App">
      <div className='img-1'>
        <h1 className='img-text-1'>Welcome!</h1>
      </div>
      <div className='section-1'>
        <div className='opening'>
          <div>
            <b>My name's Connor.</b>
          </div>
          <div className='opening-paragraph'>
            I'm a full stack software engineer at John Deere. Some of my key experiences are in implementing event driven systems, managing data platforms, and creating web applications. Welcome to my website!
          </div>
        </div>
      </div>
      <div className='img-2'/>
      <div className='section-1'>
        <div className='default-paragraph'>
          <div>
            I'm creating this page to experiment with interesting React tools. I've also tried to include a variety of relevant professional information for myself and resources I`ve found useful on my journey as a software engineer.
          </div>
        </div>
      </div>
      <div className='img-3'/>
      <div className='img-4'>
        <ContactCard />
      </div>
      <div className='built-section'>
        <div>
          <div className='built'>
            Built with 
          </div>
          <div>
            <span>
              <img src={logo} className="App-logo" alt="React logo" href="https://reactjs.org" />
              <img src={nodeLogo} className="default-logo" alt="Node logo" href="https://nodejs.org/en/docs/guides/getting-started-guide/"/>
              <img src={gitLogo} className="default-logo" alt="Github logo" href="https://github.com/cjlludwig"/>
              <img src={dockerLogo} className="default-logo" alt="Docker logo" href="https://www.docker.com/get-started/"/>
              <img src={vsCodeLogo} className="default-logo" alt="Vs Code logo" href="https://code.visualstudio.com/"/>
            </span>
          </div>
          <img style={{padding:"10px"}} src={personalLogo} className="personal-logo" alt="Personal logo" />
        </div>
      </div>
    </div>
  );
}

export default App;
