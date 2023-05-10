import { useState } from 'react';
import { useLocalState } from './utils/setLocalStorage'
import './style/signup.css';

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [jwt, setJwt] = useLocalState("", "jwt");
    console.log(username)

    function SendLogin() {
        var newLoginAttempt = {};
        newLoginAttempt.username = username;
        newLoginAttempt.password = password;
        var deJSON = JSON.stringify(newLoginAttempt);
        console.log(deJSON)

        fetch('http://localhost:8080/login',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: deJSON
        })
        .then((response) => {
            if(response.status === 200){
                return response.json();
            }
            else
                return Promise.reject("Invalid login attempt");
        })
        .then((body) => {
            console.log(body.authorization);
            console.log(body.user);
            setJwt(body.authorization);
            window.location.href = "/";
        })
        .catch((message) => {
            alert(message);
        })

    }

    return(
        <div className="Main">
            <div className="SignUpField">
                <div className="FormContainer">
                <div className="LoginTitle">
                <img src={require('./images/WorkingTalentTegel.png')} alt="React Logo" className="LoginLogo"/>
                </div>
                <h2>Login</h2>
                    <span></span>
                    <input type="username" 
                    autoFocus placeholder="E-mail" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    className="inputfield"/>

                    <span></span>
                    <input type="password" 
                    autoFocus placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="inputfield"/>

                    <span>Forgot your password?</span>
                    <button type="button" onClick={SendLogin} className="buttonGreen">Login</button>
                </div>
            </div>
        </div>
    )
  }