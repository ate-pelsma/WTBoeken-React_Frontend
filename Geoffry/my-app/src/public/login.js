import { useState } from 'react';

export function SendLogin() {
    const [jwt, setJwt] = useState("");

        var newLoginAttempt = {};
            newLoginAttempt.username = document.getElementById("username").value;
            newLoginAttempt.password = document.getElementById("password").value;
        var deJSON = JSON.stringify(newLoginAttempt);

        fetch('/login',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: deJSON
        })
        .then((response) => Promise.all([response.json(), response.headers]))
        .then(([body, headers]) => {
            setJwt(headers.get("authorization"))
        })

    return (
        <div>
            <div>
                JWT Value is {jwt};
            </div>
        </div>
    )
}