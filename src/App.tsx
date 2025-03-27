import logo from './static/images/logo.svg';
import nodeLogo from './static/images/Node.js_logo.svg';
import gitLogo from './static/images/GitHub_Logo.png';
import dockerLogo from './static/images/docker.svg';
import vsCodeLogo from './static/images/vscode.svg';
import personalLogo from './static/images/logo_transparent512.png';
import awsPic from './static/images/reinvent.jpg';
import googleAnalyticsLogo from './static/images/Logo_Google_Analytics.png';

import ContactCard from './components/ContactCard';
import Resume from './components/Resume';
import Welcome from './components/Welcome';
import Header from './components/Header';

import './static/styles/pages/App.css';
import SpotifyTrends from './components/SpotifyTrends';

function App() {
  return (
    <div className="App">
      <div id="home" className='img-1'>
        <Welcome />
      </div>
      <Header />
      <div id="aboutMe" className="anchor" />
      <div className='section-1'>
        <div className='opening'>
          <span className='opening-span'>
            <div className='img-holder'>
              <img src={awsPic} className="aws-pic" alt="AWS Pic" />
            </div>
            <div className='opening-paragraph-wrapper'>
              <div>
                <b>Connor Ludwig - Staff Software Engineer</b>
              </div>
              <div className='opening-paragraph'>
                I'm a versatile and results-driven Full-stack Software Engineer with over 8 years of experience, currently leading technical initiatives at Built Technologies. My expertise spans:
                <ul>
                  <li>Event-driven architectures and high-throughput systems</li>
                  <li>Cloud-native applications and distributed systems</li>
                  <li>Data platforms and real-time analytics</li>
                  <li>Full-stack development (React, Node.js, Python, Java)</li>
                  <li>Technical leadership and mentorship</li>
                </ul>
                Notable achievements:
                <ul>
                  <li>Led eventing data consistency project unlocking {'>'}5M in ARR</li>
                  <li>Released novel Saas license management system managing {'>'}100M in ARR</li>
                  <li>Mentored many junior engineers and coached them through promotion processes</li>
                </ul>
                I thrive in collaborative environments where I can leverage my technical expertise to mentor team members and drive innovation. My approach combines technical excellence with a focus on delivering business value through scalable, maintainable solutions.
              </div>
            </div>
          </span>
        </div>
      </div>
      <div id="resume" className="anchor" />
      <div className='img-2'>
        <div className='center'>
          <Resume />
        </div>
      </div>
      <div id="listening_to" className="anchor" />
      <div className='section-spotify-trends'>
        <SpotifyTrends />
      </div>
      <div className='section-1'>
        <div className='default-paragraph' style={{paddingTop: '0', paddingBottom: '0'}}>
          <div style={{textAlign: 'center', fontSize: '1.2rem', fontWeight: 500}}>
              <span className='tech-label' style={{display: 'block', marginBottom: '1rem', fontSize: '1.4rem'}}>Certifications</span>
              <span className='certifications'>
                AWS Developer Associate • AWS Solutions Architect Associate • Python for Data Science • Blue River Machine Learning & AI
              </span>
          </div>
        </div>
      </div>
      <div id="contactCard" className="anchor" />
      <div className='img-card'>
        <ContactCard />
      </div>
      <div id="projects" className="anchor" />
      <div className='img-catalog'>
        <div className='projects-section'>
          <h2 className='section-title'>Featured Projects</h2>
          <div className='projects-grid'>
            <div className='project-card'>
              <div className='project-header'>
                <h3>Real-time Financial Processing</h3>
                <span className='project-date'>2024</span>
              </div>
              <div className='project-content'>
                <p>Event-driven solution processing complex financial calculations with focus on accuracy and low-latency. Core project with 1-month turnaround to meet tight product release timeline.</p>
                <div className='tech-stack'>
                  <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer">
                    <span>AWS</span>
                  </a>
                  <a href="https://flink.apache.org" target="_blank" rel="noopener noreferrer">
                    <span>PyFlink</span>
                  </a>
                  <a href="https://kafka.apache.org" target="_blank" rel="noopener noreferrer">
                    <span>Kafka</span>
                  </a>
                  <a href="https://aws.amazon.com/lambda" target="_blank" rel="noopener noreferrer">
                    <span>Lambda</span>
                  </a>
                </div>
              </div>
            </div>
            <div className='project-card'>
              <div className='project-header'>
                <h3>Licensing API Platform</h3>
                <span className='project-date'>2021-2023</span>
              </div>
              <div className='project-content'>
                <p>Implemented novel licensing API platform enabling seamless ordering of embedded technologies. Included IoT license delivery, elevated data collection, and expanded product marketing options.</p>
                <div className='tech-stack'>
                  <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer">
                    <span>AWS</span>
                  </a>
                  <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">
                    <span>Node.js</span>
                  </a>
                  <a href="https://developers.google.com/protocol-buffers" target="_blank" rel="noopener noreferrer">
                    <span>Protobuf</span>
                  </a>
                  <a href="https://aws.amazon.com/iot" target="_blank" rel="noopener noreferrer">
                    <span>IoT</span>
                  </a>
                </div>
              </div>
            </div>
            <div className='project-card'>
              <div className='project-header'>
                <h3>Enterprise Data Catalog</h3>
                <span className='project-date'>2019-2021</span>
              </div>
              <div className='project-content'>
                <p>Created modern web application to simplify data discovery, governance, and management for enterprise data lake. App housed 1,000s of datasets with API integrations for data management.</p>
                <div className='tech-stack'>
                  <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer">
                    <span>AWS</span>
                  </a>
                  <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    <span>React</span>
                  </a>
                  <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
                    <span>Next.js</span>
                  </a>
                  <a href="https://spark.apache.org" target="_blank" rel="noopener noreferrer">
                    <span>Spark</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              <a href="https://analytics.google.com/analytics/web/">
                <img src={googleAnalyticsLogo} className="default-logo" alt="Google Analytics logo" />
              </a>
              <a href="https://code.visualstudio.com/">
                <img src={vsCodeLogo} className="default-logo" alt="Vs Code logo" />
              </a>
              <a href="https://www.flaticon.com/free-icons/http">
                <img 
                  src="https://media.flaticon.com/dist/min/img/logo/flaticon_negative.svg" 
                  className="default-logo"  
                  alt="Flaticon logo"
                />
              </a>
            </span>
          </div>
          <img style={{padding:"10px"}} src={personalLogo} className="personal-logo" alt="Personal logo" />
          <div className="mobile-spacer"/>
        </div>
      </div>
    </div>
  );
}

export default App;
