import { useEffect, useState } from "react"
import { useLocalState } from "./utils/setLocalStorage"
import { Reservation } from "./Reservation"

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
        .then(d => { console.log(d);setReservationData(d) })
    }

    const reservationTableData = reservationData.map(reservation => {
        return <Reservation key={reservation.id} reservation={reservation}/>
    })

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
                            <th>Status</th>
                            <th>Toewijzen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservationTableData}
                    </tbody>
                </table>
            </div>
        </div>
    )
}