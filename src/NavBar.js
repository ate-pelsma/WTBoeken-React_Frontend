import React from 'react';
import {Link} from "react-router-dom";

export default function NavBar()
{
  return(
    <header>
      <nav className="navbar">
          <img src={require('./images/WorkingTalentLogo.png')} alt="Workingtalent Logo" className="logo"/>
          <ul className="nav-links">
            {/* <li><Link to="/Catalogus" >Catalogus</Link></li>
            <li><Link to="/MyReservations" >Mijn Reserveringen</Link></li>
            <li><Link to="/MyAccount" >Mijn Account</Link></li> */}
            <li><Link to="/books" >Boekenoverzicht</Link></li>
            <li><Link to="/users" >Gebruikers overzicht</Link></li>
            {/* <li><Link to="/ReservationsSummary">Reserveringen overzicht</Link></li> */}
          </ul>
      </nav>
    </header>
  )
}
