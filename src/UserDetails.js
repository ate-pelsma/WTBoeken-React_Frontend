import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalState } from "./utils/setLocalStorage";
import fetchTemplate from "./Services/FetchTemplate";

export const UserDetails = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const { id } = useParams();
  const [userData, setUserData] = useState("");
  const [reservationData, setReservationData] = useState([])
  const [loanData, setLoanData] = useState([])
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1);
  };

  const fetchData = () => {
    fetchTemplate(`/user/${id}`, "GET", jwt)
      .then((userData) => {
        setUserData(userData)
        setReservationData(userData.reservations)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
    
    fetchTemplate(`/loan/user/${id}`, "GET", jwt)
      .then(d => setLoanData(d))
  }

  useEffect(fetchData, []);

  const renderPendingReservations = () => {
    return reservationData
      .filter((reservation) => reservation.status === "PENDING")
      .map((reservation) => (
        <tr key={reservation.id}>
          <td>{reservation.book.title}</td>
          <td>{reservation.book.author}</td>
          <td>{reservation.book.isbn}</td>
          <td>{reservation.reqDate}</td>
        </tr>
      ));
  };
  
  const renderActiveLoans = () => {
    return loanData.filter(loan => loan.endDate === null).map((loan) => (
      <tr key={loan.id}>
        <td>{loan.bookTitle}</td>
        <td>{loan.bookAuthor}</td>
        <td>{loan.bookIsbn}</td>
        <td>{loan.id}</td>
        <td>{loan.startDate}</td>
      </tr>
    ));
  };
  
  

  return (
    <div className="container mt-5">
      <div className="row">
        <table className="col table-striped align-middle text-center mt-2">
          <thead>
            <tr>
              <th>{userData.name}</th>
              <th>{userData.username}</th>
              <th>
                <svg 
                    onClick={() => navigate(`/users/edit/${id}`)}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    className="bi bi-gear-fill pointer-hover" 
                    viewBox="0 0 16 16"
                >
                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
            </th>
            </tr>
          </thead>
        </table>
        <div className="col-3 d-flex justify-content-center">
          <img
            src={require("./images/Go-back-icon.png")}
            alt="Workingtalent Logo"
            className="back-arrow"
            onClick={handleGoBack}
          />
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
          <tbody>
            {renderPendingReservations()}
          </tbody>
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
          <tbody>
            {renderActiveLoans()}
          </tbody>
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
  );
};
