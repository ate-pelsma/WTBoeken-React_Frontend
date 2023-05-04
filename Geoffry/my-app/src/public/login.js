export function SendLogin() {
        var newLoginAttempt = {};
            newLoginAttempt.username = document.getElementById("username").value;
            newLoginAttempt.password = document.getElementById("password").value;
        var deJSON = JSON.stringify(newLoginAttempt);

        return fetch('/login',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: deJSON
        })
        .then(Response => {
            if(!Response.ok){
                throw new Error('Login failed');
            }
            return Response.text();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error)
        });
    }