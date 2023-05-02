import React from 'react';
import {Link} from "react-router-dom";

export default function Nav()
{
  return(
    <header>
      <nav className="navbar">
        <img src={require('./WorkingTalentLogo.png')} alt="React Logo" className="logo"/>
        <ul className="nav-links">
        <li><Link to="/MakeAccount" >My Account</Link></li>
        <li><Link to="/Login">Login</Link></li>
          <li><img src={require('./accountlogo.png')} alt="React Logo" className="AccountLogo" /></li>

        </ul>
      </nav>
    </header>
  )
}