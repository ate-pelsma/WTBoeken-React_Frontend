import React, {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';
import { AppContext } from "./App";

export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const { authenticated, setAuthenticated } = useContext(AppContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchUsers();
    }

    const fetchUsers = () => {
        fetch("http://localhost:8080/user/all")
        .then(response => response.json())
        .then(data => {
            authenticateUser(data)
        })
    }

    const authenticateUser = (data) => {
        const account = data.find(user => user.email === email)
        let foundUser = false
        if (account && account.password === password){
            setAuthenticated(true)
            foundUser = true
            navigate("/")
        }
        if(!foundUser) alert("Credentials unknown")
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="login-mail">email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} id="login-mail" type="email" className="form-control" placeholder="youremail@email.com"></input>
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="**********"></input>
                </div>
                <Button type="submit" className="mt-2" variant="success">Log in</Button>
            </form>
            <Link to="/register">Create Account</Link>
        </div>
    )
}