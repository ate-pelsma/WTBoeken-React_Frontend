import React from 'react';
import {Link} from "react-router-dom";
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useLocalState } from './utils/setLocalStorage';

export default function NavBar()
{
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState(getRolesFromJWT());

  function getRolesFromJWT(){
    if(jwt){
      const decodedcJwt = jwtDecode(jwt);
      return decodedcJwt.permissions;
    }
    return [];
  }

let header;
switch (true) {
  case roles.includes("ROLE_ADMIN"):
    header = (
      <header>
        <nav className="navbar">
          <img
            src={require("./images/WorkingTalentLogo.png")}
            alt="Workingtalent Logo"
            className="logo"
          />
          <ul className="nav-links">
            <li>
              <Link to="/">Catalogus</Link>
            </li>
            <li>
              <Link to="/MyReservations">Mijn Reserveringen</Link>
            </li>
            <li>
              <Link to="/MyAccount">Mijn Account</Link>
            </li>
            <li>
              <Link to="/books">Boekenoverzicht</Link>
            </li>
            <li>
              <Link to="/users">Gebruikers overzicht</Link>
            </li>
            <li>
              <Link to="/ReservationsSummary">Reserveringen overzicht</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
    break;
  case roles.includes("ROLE_USER"):
    header = (
      <header>
        <nav className="navbar">
        <img
            src={require("./images/WorkingTalentLogo.png")}
            alt="Workingtalent Logo"
            className="logo"
          />
          <ul className="nav-links">
            <li>
              <Link to="/">Catalogus</Link>
            </li>
            <li>
              <Link to="/MyReservations">Mijn Reserveringen</Link>
            </li>
            <li>
              <Link to="/MyAccount">Mijn Account</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
    break;
  default:
    header = (
      <header>
        <nav className="navbar">
        <img
            src={require("./images/WorkingTalentLogo.png")}
            alt="Workingtalent Logo"
            className="logo"
          />
          <ul className="nav-links">
            <li>
              <Link to="/login">Log in</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
    break;
}

return header;
}
