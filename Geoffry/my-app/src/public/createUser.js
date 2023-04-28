window.onload = function(){
    fetch("http://localhost:8080/user/all")
        .then(q => q.json())           
}

export function validateEmail(){
    const emailInput = document.getElementById("email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const isValidEmail = emailRegex.test(emailInput);
    console.log(isValidEmail);
    console.log(emailInput);
    if(isValidEmail){
        makeAccount();
    }
    else{
        alert("Invalid email adress.");
    }
}

export function makeAccount(){
    var newUser = {};
        newUser.email = document.getElementById("email").value;
        newUser.name = document.getElementById("name").value;
        newUser.password = document.getElementById("password").value;
        var deJSON = JSON.stringify(newUser);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4)
        {
            console.log("toevoegen gelukt");
        }
    }
    xhr.open('POST', 'http://localhost:8080/user/save', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(deJSON);

}
