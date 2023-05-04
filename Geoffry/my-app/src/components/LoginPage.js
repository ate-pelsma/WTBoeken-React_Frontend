import React from 'react';
import './signup.css';
import { SendLogin } from '../public/login';

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
                    <input type="username" autoFocus placeholder="E-mail" id="username" className="inputfield"/>
                    <span></span>
                    <input type="password" autoFocus placeholder="Password" id="password" className="inputfield"/>
                    <span>Forgot your password?</span>
                    <button type="button" onClick={SendLogin}>Login</button>
                </div>
            </div>
        </div>
    )
  }