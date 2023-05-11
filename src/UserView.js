import { useState, useEffect } from "react"
import { User } from "./User"
import { useLocalState } from "./utils/setLocalStorage";

export const UserView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    const [userData, setUserData] = useState([])
    const [searchInput, setSearchInput] = useState("")

    const userTableData = userData.map(user => {
        return <User key={user.id} user={user}/>
    })

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
                        <button className="btn btn-primary">Gebruiker toevoegen</button>
                    </div>
                </div>
                <table className="table align-middle text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Naam</th>
                            <th>email</th>
                            <th>Functie</th>
                            <th style={{ width: '80px' }}></th>
                            <th style={{ width: '80px' }}>Deactiveren</th>
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