import { useState, useEffect } from "react"
import { User } from "./User"
import { Link } from "react-router-dom"

export const UserView = () => {

    const [userData, setUserData] = useState([])
    const [searchInput, setSearchInput] = useState("")

    const filterUsers = () => {
        const filteredUsers = userData.filter((user) => {
            return user.name.toLowerCase().includes(searchInput.toLowerCase())
        }) 
        return filteredUsers
    } 

    const userTableData = filterUsers().map(user => {
        return <User key={user.id} user={user}/>
    })

    let fetchUsers = () => {
        fetch("http://localhost:8080/user/all")
        .then(res => res.json())
        .then(data => { setUserData(data) } )
    }

    useEffect(fetchUsers, [])

    return (
        <div className="container">

            <div>
                
            </div>

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
                <table className="table table-striped align-middle text-center">
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