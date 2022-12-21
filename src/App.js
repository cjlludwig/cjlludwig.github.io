import logo from './static/images/logo.svg';
import nodeLogo from './static/images/Node.js_logo.svg';
import gitLogo from './static/images/GitHub_Logo.png';
import dockerLogo from './static/images/docker.svg';
import vsCodeLogo from './static/images/vscode.svg';
import personalLogo from './static/images/logo_transparent512.png';
import awsPic from './static/images/ludwig_aws.JPG';

import ContactCard from './components/ContactCard';
import Resume from './components/Resume';
import Welcome from './components/Welcome';
import LinkCatalog from './components/LinkCatalog';

import './static/styles/pages/App.css';

function App() {

  return (
    <div className="App">
      <div className='img-1'>
        <Welcome />
      </div>
      <div className='section-1'>
        <div className='opening'>
          <span className='opening-span'>
            <div className='img-holder'>
              <img src={awsPic} className="aws-pic" alt="AWS Pic" />
            </div>
            <div className='opening-paragraph-wrapper'>
              <div>
                <b>Connor Ludwig -</b>
              </div>
                <div className='opening-paragraph'>
                  "I'm a full-stack software engineer at John Deere. 
                  Some of my key experiences are in event driven architectures, data platforms, and cloud-hosted web applications. 
                  I thrive in collaborative workplaces with a focus on innovative work. I help to get the best out of my team while getting the task at hand done."
                </div>
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
      <div className='img-catalog'>
        <LinkCatalog />
      </div>
      <div className='section-1'>
      </div>
      <div className='img-card'>
        <ContactCard />
      </div>
      <div className='built-section'>
        <div>
          <div className='built'>
            Built with 
          </div>
          <div>
            <span>
              <a href="https://reactjs.org">
                <img src={logo} className="App-logo" alt="React logo" />
              </a>
              <a href="https://nodejs.org/en/docs/guides/getting-started-guide/">
                <img src={nodeLogo} className="default-logo" alt="Node logo" />
              </a>
              <a href="https://github.com/cjlludwig">
                <img src={gitLogo} className="default-logo" alt="Github logo" />
              </a>
              <a href="https://www.docker.com/get-started/">
                <img src={dockerLogo} className="default-logo" alt="Docker logo" />
              </a>
              <a href="https://code.visualstudio.com/">
                <img src={vsCodeLogo} className="default-logo" alt="Vs Code logo" />
              </a>
              <a href="https://www.flaticon.com/free-icons/http">
                <img 
                  src="https://media.flaticon.com/dist/min/img/logo/flaticon_negative.svg" 
                  className="default-logo"  
                  alt="Flaticon logo"
                  style={{
                    paddingLeft: "10px",
                    width: "17%",
                    objectFit: "cover",
                    objectPosition: "0 100%"
                  }}
                />
              </a>
            </span>
          </div>
          <img style={{padding:"10px"}} src={personalLogo} className="personal-logo" alt="Personal logo" />
        </div>
      </div>
    </div>
  );
}

export default App;
