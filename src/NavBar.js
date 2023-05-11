import React from 'react';
import {Link} from "react-router-dom";
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useLocalState } from './utils/setLocalStorage';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBar()
{
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState(getRolesFromJWT());
  const [navBarLinks, setNavBarLinks] = useState("");

  function getRolesFromJWT(){
    if(jwt){
      const decodedcJwt = jwtDecode(jwt);
      return decodedcJwt.permissions;
    }
    return [];
  }

  function setNavBar(){
    console.log(roles);
    let links;
    if(roles[0] === ("ROLE_ADMIN")){
      links = (
          <>
            <Nav.Link href="/" className="navLinks">Catalogus</Nav.Link>
            <Nav.Link href="/MyReservations" className="navLinks">Mijn Reserveringen</Nav.Link>
            <Nav.Link href="/MyAccount" className="navLinks">Mijn Account</Nav.Link>
            <Nav.Link href="/books" className="navLinks">Boekenoverzicht</Nav.Link>
            <Nav.Link href="/users" className="navLinks">Gebruikers overzicht</Nav.Link>
            <Nav.Link href="/ReservationsSummary" className="navLinks">Reserveringen overzicht</Nav.Link>
          
          </>
      );
    }
    else if(roles[0] === ("ROLE_USER")){
      links = (
        <>
            <Nav.Link href="/" className="navLinks">Catalogus</Nav.Link>
            <Nav.Link href="/MyReservations" className="navLinks">Mijn Reserveringen</Nav.Link>
            <Nav.Link href="/MyAccount" className="navLinks">Mijn Account</Nav.Link>
        </>
      );
    }
    else{
      links = (
        <Nav.Link href="/login" className="navLinks">Log in</Nav.Link>
      );
    }
    setNavBarLinks(links)
  }

  useEffect(() => {
    setNavBar()
}, [])

  return (
    <Navbar sticky="top" bg="white" expand="lg">
      <Container margin="0">
        <Navbar.Brand>
          <img src=
                    {require("./images/WorkingTalentLogo.png")}
                    alt="Workingtalent Logo"
                    className="logo"
                    />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navBarLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}
