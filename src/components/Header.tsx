import { useState, useEffect, useCallback, useRef } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import personalLogo from '../static/images/logo_transparent512.png';
import 'bootstrap/dist/css/bootstrap.min.css';


import "../static/styles/components/Header.css";

function Header() {
  const [navBarClass, setNavBarClass] = useState("header-navbar-scrolling");
  const [pixelsScrolled, setPixelsScrolled] = useState(window.scrollY);
  const [isSticky, setSticky] = useState(false);
  const [height, setHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);
  const viewportHeight = window.innerHeight;
  const isMobile = window.innerWidth <= 960; // Common mobile cutoff

  const handleNavigation = useCallback((e: { currentTarget: any }) => {
    const window = e.currentTarget;
    if (isMobile) {
      if (pixelsScrolled <= height) {
        setNavBarClass("header-navbar-scrolling-mobile");
        setSticky(false);
      }
      if (pixelsScrolled >= height) {
        setNavBarClass("header-navbar-mobile");
        setSticky(true);
      }
    } else {
      if (pixelsScrolled <= viewportHeight) {
        setNavBarClass("header-navbar-scrolling");
        setSticky(false);
      }
      if (pixelsScrolled >= viewportHeight) {
        setNavBarClass("header-navbar");
        setSticky(true);
      }
    }
    setPixelsScrolled(window.scrollY);
  }, [pixelsScrolled, viewportHeight, height, isMobile]);

  useEffect(() => {
    setPixelsScrolled(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  useEffect(() => {
    if (navbarRef.current) {
      setHeight(navbarRef.current.clientHeight)
    }
  }, [])

  return (
    <>
      <Navbar
        ref={navbarRef}
        className={navBarClass}
      >
        <Navbar.Brand href="/">
          <img className="header-logo" src={personalLogo} alt="Personal logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="mr-auto" >
          <Nav.Link key='nav-1' eventKey='1' href="#home" style={{ color: 'white' }}>Home</Nav.Link>
          <Nav.Link key='nav-2' href="#aboutMe" style={{ color: 'white' }}>About Me</Nav.Link>
          <Nav.Link key='nav-3' href="#resume" style={{ color: 'white' }}>Resume</Nav.Link>
          <Nav.Link key='nav-4' href="#listening_to" style={{ color: 'white' }}>Listening To</Nav.Link>
          <Nav.Link key='nav-6' href="#contactCard" style={{ color: 'white' }}>Contact Card</Nav.Link>
          <Nav.Link key='nav-5' href="#links" style={{ color: 'white' }}>Links</Nav.Link>
        </Nav>
      </Navbar>
      {isSticky &&
        <div style={{ height: `${height}px` }} />
      }
    </>
  );
}

export default Header;