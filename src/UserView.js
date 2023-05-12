import { useState, useEffect } from "react"
import { User } from "./User"
import { Link } from "react-router-dom"
import { useLocalState } from "./utils/setLocalStorage";

export const UserView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    const [userData, setUserData] = useState([])
    const [searchInput, setSearchInput] = useState("")

    const filterUsers = () => {
        const filteredUsers = userData.filter((user) => {
            return user.name.toLowerCase().includes(searchInput.toLowerCase())||user.username.toLowerCase().includes(searchInput.toLowerCase())||user.permissions.toLowerCase().includes(searchInput.toLowerCase())
        }) 
        return filteredUsers
    } 

    let fetchUsers = () => {
        fetch("http://localhost:8080/user/all", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        })
        .then(res => res.json())
        .then(data => { setUserData(data) } )
    }
    
    const handleUserInactive = (id) => {
        fetch("http://localhost:8080/user/inactive/" + id, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        })
        .then((r) => r.json())
        .then((d) => {
            setUserData((prevData) =>
            prevData.map((user) => (user.id === id ? d : user))
            );
        })
    }

    const userTableData = filterUsers().map(user => {
        return <User key={user.id} user={user} handleUserInactive={handleUserInactive}/>
    })

    useEffect(fetchUsers, [])

    return (
        <div className="container">
            <div className="p-4">
                <div className="row align-middle">
                    <div className="col">
                        <input type="text" className="mb-5" onChange={(e) => setSearchInput(e.target.value)} placeholder="Gebruiker zoeken"></input>
                    </div>
                    <div className="col-auto">
                        <Link to="/users/create">
                            <button className="btn buttonGreen">Gebruiker toevoegen</button>
                        </Link>
                    </div>
                    
                </div>
                <table className="table table-bordered table-striped align-middle text-center">
                    <thead>
                        <tr>
                            <th>Naam</th>
                            <th>email</th>
                            <th>Functie</th>
                            <th style={{ width: "40px" }}></th>
                            <th style={{ width: "80px" }}>Deactiveren</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userTableData}
                    </tbody>
                </table>
            </div>
        </div>
    )
}