import { useState, useEffect } from "react"
import { User } from "./User"

export const UserView = () => {

    const [userData, setUserData] = useState([])

    const userTableData = userData.map(user => {
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
            <h1>Welcome to user overview page</h1>

            <div className="p-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Naam</th>
                            <th>email</th>
                            <th>Functie</th>
                            <th></th>
                            <th></th>
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