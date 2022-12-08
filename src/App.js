import logo from './static/images/logo.svg';
import nodeLogo from './static/images/Node.js_logo.svg';
import gitLogo from './static/images/GitHub_Logo.png';
import dockerLogo from './static/images/docker.svg';
import vsCodeLogo from './static/images/vscode.svg';
import personalLogo from './static/images/logo_transparent512.png';
import awsPic from './static/images/ludwig_aws.JPG';

import ContactCard from './components/ContactCard';
import Resume from './components/Resume';

import './static/pages/App.css';
// import FadeInSection from './components/FadeInSection';


function App() {

  return (
    <div className="App">
      <div className='img-1'>
        <h1 className='img-text-1'>Hello!</h1>
      </div>
      <div className='section-1'>
        <div className='opening'>
          <span className='opening-span'>
            <div className='img-holder'>
              <img src={awsPic} className="aws-pic" alt="AWS Pic" />
            </div>
            <div>
              <div>
                <b>My name's Connor.</b>
              </div>
              {/* <FadeInSection> */}
                <div className='opening-paragraph'>
                  I'm a full stack software engineer at John Deere. <br/>
                  Some of my key experiences are in implementing event driven systems, managing data platforms, and creating web applications. <br/>
                  Welcome to my website!
                </div>
              {/* </FadeInSection> */}
            </div>
          </span>
        </div>
      </div>
      <div className='img-2'>
        <div className='center'>
          <Resume />
        </div>
      </div>
      <div className='section-1'>
        <div className='default-paragraph'>
          <div>
            I'm creating this page to experiment with interesting React tools. I'll also be including a variety of relevant professional info for myself and resources I've found useful on my journey as a software engineer. So expect updates over the coming months.
          </div>
        </div>
      </div>
      <div className='img-3'>
        <ContactCard />
      </div>
      {/* <div className='img-4'>
      </div> */}
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
