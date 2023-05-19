import { useEffect, useState } from "react"
import { useLocalState } from "./utils/setLocalStorage"
import { Reservation } from "./Reservation"
import fetchTemplate from "./Services/FetchTemplate"

export const ReservationView = () => {
    const [jwt, setJwt] = useLocalState("","jwt")
    const [reservationData, setReservationData] = useState([])
    const [loanData, setLoanData] = useState([])
    
    let fetchReservations = () => {
        // fetch("http://localhost:8080/reservation/all", {
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${jwt}`,
        //     },
        //     method: "GET",
        // })
        // .then(r => r.json())
        // .then(d => { 
        //     console.log(d)
        //     setReservationData(d) 
        // })
        fetchTemplate(`/reservation/all`, "GET", jwt)
        .then(d => setReservationData(d))
        fetchTemplate(`/loan/all`, "GET", jwt)
        .then(d => setLoanData(d))
    }

    const reservationTableData = reservationData.map(reservation => {
        return <Reservation key={reservation.id} reservation={reservation}/>
    })

    const renderActiveLoans = () => {
    return loanData.filter(loan => loan.endDate === null).map((loan) => (
        <tr key={loan.id}>
        <td>{loan.userName}</td>
        <td>{loan.bookTitle}</td>
        <td>{loan.id}</td>
        <td>{loan.startDate}</td>
        <td>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" height="16" 
                    fill="#00e600" 
                    className="bi bi-hand-index-fill" 
                    viewBox="0 0 16 16"
                >
                    <path d="M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v5.34l-1.2.24a1.5 1.5 0 0 0-1.196 1.636l.345 3.106a2.5 2.5 0 0 0 .405 1.11l1.433 2.15A1.5 1.5 0 0 0 6.035 16h6.385a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5.114 5.114 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.632 2.632 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046l-.048.002z"/>
                </svg>
        </td>
        </tr>
    ));
    };

    const renderPastLoans = () => {
    return loanData.filter(loan => loan.endDate != null).map((loan) => (
        <tr key={loan.id}>
        <td>{loan.userName}</td>
        <td>{loan.bookTitle}</td>
        <td>{loan.id}</td>
        <td>{loan.startDate}</td>
        <td>{loan.endDate}</td>
        </tr>
    ));
    };

    useEffect(fetchReservations, [])

    return (
        <div className="container">
            <div className="p-4">
                <div className="row align-middle">
                    <h4>Reserveringen:</h4>
                    <table className="table table-striped align-middle text-center mt-2">
                        <thead>
                            <tr>
                                <th>Gebruiker</th>
                                <th>Boek</th>
                                <th>Aanvraagdatum</th>
                                {/* <th>Status</th> */}
                                <th>Beschikbaar</th>
                                <th>Toewijzen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservationTableData}
                        </tbody>
                    </table>
                </div>
                <div className="row align-middle">
                    <h4>Uitgeleend:</h4>
                    <table className="table table-striped align-middle text-center mt-2">
                        <thead>
                            <tr>
                                <th>Gebruiker</th>
                                <th>Boek</th>
                                <th>Kopienummer</th>
                                <th>Leendatum</th>
                                <th>Terugbrengen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderActiveLoans()}
                        </tbody>
                    </table>
                </div>
                <div className="row align-middle">
                    <h4>Geschiedenis:</h4>
                    <table className="table table-striped align-middle text-center">
                        <thead>
                            <tr>
                            <th>Gebruiker</th>
                                <th>Boek</th>
                                <th>Kopienummer</th>
                                <th>Leendatum</th>
                                <th>Terugdatum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderPastLoans()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}