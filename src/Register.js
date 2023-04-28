import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

export const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            email: email,
            password: password,
            name: name
        }

        postUser(data)
    }

    const postUser = (data) => {
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }

            fetch("http://localhost:8080/user/save", requestOptions)
            .then((r) => r.json())
            .then((d) => console.log("Success:", d))
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>name</label>
                    <input onChange={(e) => setName(e.target.value)} type="name" className="form-control" placeholder="Your name"></input>
                </div>
                <div className="form-group">
                    <label>email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="youremail@email.com"></input>
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="*********"></input>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">I Agree</label>
                </div>
                <Button type="submit" className="mt-2" variant="success">Register</Button>
            </form>
            <Link to="/">Log In</Link>
        </div>
    )
}