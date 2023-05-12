import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useLocalState } from "./utils/setLocalStorage"

export const UserEdit = () => {
    
    const {id} = useParams()
    const [user, setUser] = useState("")
    const [jwt, setJwt] = useLocalState("", "jwt")
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        permissions: "",
        checked: false,
    });

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        formData.permissions = checked ? "ROLE_ADMIN":"ROLE_USER"

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        let {checked, ...userData} = formData
        
        fetch("http://localhost:8080/user/admin/" + id, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            },
            method: "PUT",
            body: JSON.stringify(userData)
        })

        window.location.href = "http://localhost:3000/users"
    };

    const fetchUser = () => {
        fetch("http://localhost:8080/user/" + id)
        .then(r => r.json())
        .then(d => setUser(d))
    }

    useEffect(() => {
        fetchUser()
    })

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="nameInput" className="form-label">Naam</label>
                    <input type="text" placeholder={user.name} className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email</label>
                    <input type="email" placeholder={user.username} className="form-control" id="email" name="username" value={formData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Wachtwoord</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="checkbox" name="checked" checked={formData.checked} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="checkbox">Admin?</label>
                </div>
                <button type="submit" className="buttonGreen">Bewerken</button>
            </form>
        </div>
    )
}