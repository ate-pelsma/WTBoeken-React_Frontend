import { useEffect, useState } from "react"
import { useLocalState } from "./utils/setLocalStorage"
import { Reservation } from "./Reservation"
import fetchTemplate from "./Services/FetchTemplate"
import { WarningModal } from "./WarningModal"
import { SearchBar } from "./SearchBar"

export const ReservationView = () => {
    const [jwt, setJwt] = useLocalState("","jwt")
    const [reservationData, setReservationData] = useState([])
    const [loanData, setLoanData] = useState([])
    const [lentData, setLentData] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const [searchLoanInput, setSearchLoanInput] = useState("")
    const [filteredLoanData, setFilteredLoanData] = useState([])
    const [searchLentInput, setSearchLentInput] = useState("")
    const [filteredLentData, setFilteredLentData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [modalElement, setModalElement] = useState("")
    
    let fetchReservations = () => {
        fetchTemplate(`/reservation/all`, "GET", jwt)
        .then(d => {
            d = d.filter((reservation) => reservation.status === "PENDING")
            setReservationData(d)
            setFilteredData(d)
        })
        fetchTemplate(`/loan/all`, "GET", jwt)
        .then(d => {
            let e = d.filter(loan => loan.endDate != null)
            d = d.filter(loan => loan.endDate === null)
            setLoanData(d)
            setFilteredLoanData(d)
            setLentData(e)
            setFilteredLentData(e)
        })
    }

    const reservationTableData = filteredData.map(reservation => {
        return <Reservation key={reservation.id} reservation={reservation}/>
    })

    const renderActiveLoans = () => {
    return filteredLoanData.map((loan) => (
        <tr key={loan.id}>
        <td>{loan.userName}</td>
        <td>{loan.bookTitle}</td>
        <td>{loan.copyNumber}</td>
        <td>{loan.startDate}</td>
        <td>
                <svg 
                    onClick={() => handleReturnClick(loan)}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" height="16" 
                    fill="#00e600" 
                    className="bi bi-hand-index-fill pointer-hover" 
                    viewBox="0 0 16 16"
                >
                    <path d="M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v5.34l-1.2.24a1.5 1.5 0 0 0-1.196 1.636l.345 3.106a2.5 2.5 0 0 0 .405 1.11l1.433 2.15A1.5 1.5 0 0 0 6.035 16h6.385a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5.114 5.114 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.632 2.632 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046l-.048.002z"/>
                </svg>
        </td>
        </tr>
    ));
    };

    const renderPastLoans = () => {
    return filteredLentData.map((loan) => (
        <tr key={loan.id}>
        <td>{loan.userName}</td>
        <td>{loan.bookTitle}</td>
        <td>{loan.copyNumber}</td>
        <td>{loan.startDate}</td>
        <td>{loan.endDate}</td>
        </tr>
    ));
    };

    const handleReturnClick = (loan) => {
        setModalElement(
            <WarningModal
              toggleModal={setShowModal}
              setAction={() => {
                fetch(`http://localhost:8080/loan/return/${loan.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                    method: "GET",
                })
                .then(fetchReservations)
                // fetchTemplate(`/loan/return/${loan.id}`, "GET", jwt).then(fetchReservations)
              }}
              modalText={`Wil je ${loan.bookTitle} onder naam van ${loan.userName} terugbrengen?`}
            />
          )
        setShowModal(true)
    }

    useEffect(() => fetchReservations(), []);

    return (
        <div className="container">
            {showModal && modalElement}
            <div className="p-4">
                <div className="row align-middle my-3">
                    <div className="col-md-4">
                        <h4>Reserveringen:</h4>
                    </div>
                    <div className="col-md-8 d-flex justify-content-end">
                        <SearchBar
                            key={searchInput}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            dataToFilter={reservationData}
                            setFilteredData={setFilteredData}
                            filterKeys={["userName", "bookTitle"]}
                            placeholder={"zoek reservering hier"}
                        />
                    </div>
                </div>
                <div className="row">
                {reservationData.length > 0 && (
                    <table className="table table-striped align-middle text-center mt-2">
                        <thead>
                            <tr>
                                <th>Gebruiker</th>
                                <th>Boek</th>
                                <th>Aanvraagdatum</th>
                                <th>Beschikbaar</th>
                                <th>Toewijzen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservationTableData}
                        </tbody>
                    </table>
                )}
                </div>
                <div className="row align-middle my-5">
                    <div className="col-md-4">
                            <h4>Uitgeleend:</h4>
                        </div>
                        <div className="col-md-8 d-flex justify-content-end">
                            <SearchBar
                                key={searchLoanInput}
                                searchInput={searchLoanInput}
                                setSearchInput={setSearchLoanInput}
                                dataToFilter={loanData}
                                setFilteredData={setFilteredLoanData}
                                filterKeys={["userName", "bookTitle"]}
                                placeholder={"zoek uitgeleend boek hier"}
                            />
                        </div>
                </div>
                <div className="row">
                {loanData.length > 0 && (
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
                )}
                </div>
                <div className="row align-middle my-5">
                    <div className="col-md-4">
                        <h4>Geschiedenis:</h4>
                    </div>
                    <div className="col-md-8 d-flex justify-content-end">
                        <SearchBar
                            key={searchLentInput}
                            searchInput={searchLentInput}
                            setSearchInput={setSearchLentInput}
                            dataToFilter={lentData}
                            setFilteredData={setFilteredLentData}
                            filterKeys={["userName", "bookTitle"]}
                            placeholder={"zoek uitgeleend boek hier"}
                        />
                    </div>
                </div>
                <div className="row">
                {lentData.length > 0 && (
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
                )}
                </div>
            </div>
        </div>
    )
}