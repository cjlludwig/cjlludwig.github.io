import { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { Links } from '../models/links';
import linkPic from '../static/images/web-link.png';
import { Card } from "react-bootstrap";
import '../static/styles/components/LinkAccordion.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function LinkAccordion<Props extends { links: Links[] }>(props: Props) {
  const { links=[] } = props;
  const [ openKey, setOpen ] = useState<number | null>(null);

  return (
    <Accordion >
    {
      links.map((data, index) => {
        const { name, url, description } = data;
        return (
          <Accordion.Item key={index} eventKey={`${index+1}`}>
            <Accordion.Header
              onClick={() => setOpen(index)}
            >
             {name}
            </Accordion.Header>
            <Accordion.Body>
              {openKey === index &&
              <a href={url} style={{ textDecoration: "none", color: "inherit" }}>
                <span className="link-span">
                  <img src={linkPic} className="link-pic" alt="default link" />
                  <Card className="link-card">
                    <Card.Header>{name}</Card.Header>
                    <Card.Body>{description}</Card.Body>
                    <Card.Footer style={{ textDecoration: "underline", color: "blue" }}>{url}</Card.Footer>
                  </Card>
                </span>
              </a>
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
