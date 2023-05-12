import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useLocalState } from "./utils/setLocalStorage";

export const UserDetails = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const {id} = useParams()
    const [user, setUser] = useState("")

    const fetchUser = () => {
        fetch("http://localhost:8080/user/" + id, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        })
        .then(r => r.json())
        .then(d => setUser(d))
    }

    useEffect(() => {
        fetchUser()
    })

    return (
        <div className="container mt-5" >
            <div className="row mb-5 mx-5">
                <div className="col text-center">
                    <h3>{user.name}</h3>
                </div>
                <div className="col text-center">
                    <h3>{user.username}</h3>
                </div>
                <div className="col text-center">
                    <Link to="/users">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#00e600" class="bi bi-skip-backward-fill" viewBox="0 0 16 16">
                        <path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5z"/>
                    </svg>
                    </Link>
                </div>
            </div>
            <div className="row my-5">
                <h4>Reserveringen:</h4>
                <table className="table table-bordered table-striped align-middle text-center mt-2">
                    <thead>
                        <tr>
                            <th>Titel</th>
                            <th>Auteur</th>
                            <th>ISBN</th>
                            <th>Reserveringsdatum</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="row my-5">
                <h4>Boeken in lening:</h4>
                <table className="table table-bordered table-striped align-middle text-center mt-2">
                    <thead>
                        <tr>
                            <th>Titel</th>
                            <th>Auteur</th>
                            <th>ISBN</th>
                            <th>Exemplaar nr.</th>
                            <th>Datum uitlening</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="row my-5">
                <h4>Leengeschiedenis:</h4>
                <table className="table table-bordered table-striped align-middle text-center mt-2">
                    <thead>
                        <tr>
                            <th>Titel</th>
                            <th>Auteur</th>
                            <th>ISBN</th>
                            <th>Exemplaar nr.</th>
                            <th>Datum uitlening</th>
                            <th>Datum teruggave</th>
                        </tr>
                    </thead>
                </table>
            </div>            
        </div>
    )
}