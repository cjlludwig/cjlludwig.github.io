import { ReactTinyLink } from 'react-tiny-link';
import Accordion from 'react-bootstrap/Accordion';

import linkPic from '../static/images/web-link.png';

import '../static/styles/components/LinkCatalog.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const links = [
  {
    name: "Tao of Node",
    description: "Opinionated piece with some interesting and useful insights on Node Best Practices.",
    url: "https://alexkondov.com/tao-of-node/"
  },
  {
    name: "2022 Most Popular Node Frameworks",
    description: "Overview of the most commonly used frameworks in Node apps pulled from a variety of dev surveys.",
    url: "https://stackdiary.com/node-js-frameworks/"
  },
  {
    name: "react-gh-pages",
    description: "An easy to use framework for deploying React apps to GitHub pages.",
    url: "https://github.com/gitname/react-gh-pages"
  },
  {
    name: "Coolors",
    description: "Color palette generator for websites.",
    url: "https://coolors.co/"
  },
  {
    name: "Node Weekly Newsletter",
    description: "Newsletter I use to keep .",
    url: "https://nodeweekly.com/"
  },
  {
    name: "Dr. Werner Vogels Keynote",
    description: "Dr. Werner Vogels AWS Re:Invent kyenote covering interesting architecture patterns and technologies.",
    url: "https://www.youtube.com/watch?v=RfvL_423a-I"
  },
  {
    name: "Purecss",
    description: "Simple, compact CSS modules for use in new projects.",
    url: "https://purecss.io/"
  },
  {
    name: "Docker-OSX",
    description: "A containerized version of Mac OSX.",
    url: "https://github.com/sickcodes/Docker-OSX"
  },
];

function LinkCatalog() {
  return (
    <div className='link-catalog-wrapper'>
      <h2 className='link-header'>
        Link Drawer
      </h2>
      <Accordion>
        {
          links.map((data, index) => {
            const { name, url, description } = data;
            return (
              <Accordion.Item key={index} eventKey={index + 1}>
                <Accordion.Header>
                 {name}
                </Accordion.Header>
                <Accordion.Body>
                  <ReactTinyLink
                    width="100%"
                    description={description}
                    defaultMedia={linkPic}
                    cardSize="small"
                    showGraphic={true}
                    maxLine={3}
                    minLine={2}
                    url={url}
                  />
                </Accordion.Body>
              </Accordion.Item>
            )
          })
        }
      </Accordion>
    </div>
  );
}

export default LinkCatalog; 