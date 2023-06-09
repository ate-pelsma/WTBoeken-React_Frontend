import { useState } from "react";
import { useLocalState } from "./utils/setLocalStorage";
import "./style/signup.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      SendLogin();
    }
  };

  function SendLogin() {
    var newLoginAttempt = {};
    newLoginAttempt.username = username;
    newLoginAttempt.password = password;
    var deJSON = JSON.stringify(newLoginAttempt);

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: deJSON,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else return Promise.reject("Invalid login attempt");
      })
      .then((body) => {
        setJwt(body.authorization);
        window.location.href = "/";
      })
      .catch((message) => {
        alert(message);
      });
  }

  return (
    <div className="Main">
      <div className="SignUpField">
        <div className="FormContainer">
          <div className="LoginTitle">
            <img
              src={require("./images/WorkingTalentTegel.png")}
              alt="React Logo"
              className="LoginLogo"
            />
          </div>
          <h2>Login</h2>
          <span></span>
          <input
            type="username"
            autoFocus
            placeholder="E-mail"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="inputfield"
          />

          <span></span>
          <input
            type="password"
            autoFocus
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e)}
            className="inputfield"
          />

          <span>Forgot your password?</span>
          <button type="button" onClick={SendLogin} className="buttonGreen">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
