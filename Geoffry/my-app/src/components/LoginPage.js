import { useState } from 'react';
import { useLocalState } from './utils/setLocalStorage';

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [jwt, setJwt] = useLocalState("", "jwt");
    console.log(username)

    function SendLogin() {
    if(!jwt){
        var newLoginAttempt = {};
        newLoginAttempt.username = username;
        newLoginAttempt.password = password;
        var deJSON = JSON.stringify(newLoginAttempt);

        fetch('/login',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: deJSON
        })
        .then((response) => {
            if(response.status === 200)
                return Promise.all([response.json(), response.headers])
            else
                return Promise.reject("Invalid login attempt");
        })
        .then(([body, headers]) => {
            setJwt(headers.get("authorization"));
            window.location.href = "MakeAccount";
        })
        .catch((message) => {
            alert(message);
        })
    }

    }

    return(
        <div className="Main">
            <div className="SignUpField">
                <div className="FormContainer">
                <div className="LoginTitle">
                <img src={require('./WorkingTalentTegel.png')} alt="React Logo" className="LoginLogo"/>
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
                    autoFocus placeholder="E-password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="inputfield"/>
                    <span>Forgot your password?</span>
                    <button type="button" onClick={SendLogin}>Login</button>
                </div>
            </div>
        </div>
    )
  }