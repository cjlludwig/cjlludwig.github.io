import { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { ReactTinyLink } from 'react-tiny-link';
import linkPic from '../static/images/web-link.png';


import 'bootstrap/dist/css/bootstrap.min.css';

function LinkAccordion({ links=[] }) {
  const [ openKey, setOpen ] = useState(null);
  // const proxy = process.env.REACT_APP_ENV === "dev" ? "https://proxy.cors.sh" : "";

  return (
    <Accordion >
    {
      links.map((data, index) => {
        const { name, url, description } = data;
        return (
          <Accordion.Item key={index} eventKey={index + 1}>
            <Accordion.Header
              onClick={() => setOpen(index)}
            >
             {name}
            </Accordion.Header>
            <Accordion.Body>
              {openKey === index &&
                <ReactTinyLink
                  width="100%"
                  description={description}
                  defaultMedia={linkPic}
                  cardSize="small"
                  showGraphic={true}
                  maxLine={3}
                  minLine={2}
                  url={url}
                  proxyUrl={""}
                  requestHeaders={ { 
                    "Access-Control-Allow-Origin": "*" ,
                    "Access-Control-Allow-Headers":"*",
                    'Access-Control-Allow-Methods': 'HEAD, GET, OPTIONS',
                    "Access-Control-Max-Age": 1000,
                  } }
                />
              } 
            </Accordion.Body>
          </Accordion.Item>
        )
      })
    }
  </Accordion>
  );
}

export default LinkAccordion;
