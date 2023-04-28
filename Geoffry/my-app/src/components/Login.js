import React from 'react';
import {validateEmail} from '../public/createUser';
import './signup.css';

export default function Login(){
    return(
        <div className="Main">
            <div className="SignUpField">
                <div className="FormContainer">
                <div className="LoginTitle">
                <img src={require('./WorkingTalentTegel.png')} alt="React Logo" className="LoginLogo"/>
                </div>
                <h2>Login</h2>
                    <span></span>
                    <input type="text" autoFocus placeholder="E-mail" id="email" className="inputfield" />
                    <span></span>
                    <input type="text" autoFocus placeholder="Password" id="password" className="inputfield" />
                    <span>Forgot your password?</span>
                    <button onClick={validateEmail}>Login</button>
                </div>
            </div>
        </div>
        
    )
  }