import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useLocalState } from "./utils/setLocalStorage";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function NavBar() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState(getRolesFromJWT());
  const [navBarLinks, setNavBarLinks] = useState("");
  const navigate = useNavigate();

  function getRolesFromJWT() {
    if (jwt) {
      const decodedcJwt = jwtDecode(jwt);
      return decodedcJwt.permissions;
    }
    return [];
  }

  const logOutClick = () => {
    setJwt(null);
    localStorage.setItem("jwt", null);
    window.location.href = "/login";
  };

  function setNavBar() {
    let links;
    if (roles[0] === "ROLE_ADMIN") {
      links = (
        <>
          <Nav.Link href="/" className="navLinks">
            Catalogus
          </Nav.Link>
          <Nav.Link href="/mybooks" className="navLinks">
            Mijn Boeken
          </Nav.Link>
          <Nav.Link href="/users/self" className="navLinks">
            Mijn Account
          </Nav.Link>
          <Nav.Link href="/books" className="navLinks">
            Boekenoverzicht
          </Nav.Link>
          <Nav.Link href="/users" className="navLinks">
            Gebruikers overzicht
          </Nav.Link>
          <Nav.Link href="/reservations" className="navLinks">
            Reserveringen overzicht
          </Nav.Link>
          <Nav.Link href="#" className="navLinks" onClick={logOutClick}>
            Log uit
          </Nav.Link>
        </>
      );
    } else if (roles[0] === "ROLE_USER") {
      links = (
        <>
          <Nav.Link href="/" className="navLinks">
            Catalogus
          </Nav.Link>
          <Nav.Link href="/mybooks" className="navLinks">
            Mijn Boeken
          </Nav.Link>
          <Nav.Link href="/MyAccount" className="navLinks">
            Mijn Account
          </Nav.Link>
          <Nav.Link href="#" className="navLinks" onClick={logOutClick}>
            Log uit
          </Nav.Link>
        </>
      );
    } else {
      links = (
        <Nav.Link href="/login" className="navLinks">
          Log in
        </Nav.Link>
      );
    }
    setNavBarLinks(links);
  }

  useEffect(() => {
    setNavBar();
  }, []);

  return (
    <Navbar sticky="top" bg="white" expand="lg">
      <Container margin="0">
        <Navbar.Brand>
          <img
            src={require("./images/WorkingTalentLogo.png")}
            alt="Workingtalent Logo"
            className="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">{navBarLinks}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
