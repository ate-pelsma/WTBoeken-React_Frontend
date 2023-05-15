import { useEffect, useState } from "react"
import { useLocalState } from "./utils/setLocalStorage"

export const ReservationView = () => {
    const [jwt, setJwt] = useLocalState("","jwt")
    const [reservationData, setReservationData] = useState([])
    
    let fetchReservations = () => {
        fetch("http://localhost:8080/reservation/all", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        })
        .then(r => r.json())
        .then(d => { setReservationData(d) })
    }

    useEffect(fetchReservations, [])

    return (
        <div className="container">
            <div className="p-4">
                <div className="row align-middle">
                    
                </div>
                <table className="table table-striped align-middle text-center">
                    <thead>
                        <tr>
                            <th>Boek</th>
                            <th>Gebruiker</th>
                            <th>Aanvraagdatum</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}