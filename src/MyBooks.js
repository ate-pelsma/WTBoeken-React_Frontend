import { useEffect, useState } from "react";
import { useLocalState } from "./utils/setLocalStorage";
import fetchTemplate from "./Services/FetchTemplate";

export const MyBooks = () => {
  const [reservationData, setReservationData] = useState([]);
  const [activeLoans, setActiveLoans] = useState([]);
  const [loanHistory, setLoanHistory] = useState([]);
  const [jwt, setJwt] = useLocalState("", "jwt");

  const fetchReservations = () => {
    fetchTemplate("/user/reservations", "GET", jwt).then((r) =>
      setReservationData(r)
    );
  };

  const fetchLoan = () => {
    fetchTemplate("/user/loans", "GET", jwt).then((r) => {
      let activeLoans = [];
      let loanHistory = [];
      for (let i = 0; i < r.length; i++) {
        if (r[i].endDate === null) {
          activeLoans.push(r[i]);
        } else {
          loanHistory.push(r[i]);
        }
      }
      setActiveLoans(activeLoans);
      setLoanHistory(loanHistory);
    });
  };

  useEffect(() => {
    fetchReservations();
    fetchLoan();
  }, []);

  const handleClick = (id) => {
    const requestBody = { id: id };
    fetchTemplate(
      "/reservation/update/cancel/" + id,
      "PUT",
      jwt,
      requestBody
    ).then((r) => {
      fetchReservations();
    });
  };

  const reservationElements = reservationData.map((res) => {
    return (
      <tr key={res.reservationId}>
        <td>{res.date}</td>
        <td>{res.bookTitle}</td>
        <td>{res.bookAuthor}</td>
        <td>{res.bookIsbn}</td>
        <td>
          <button
            className="buttonGrey"
            onClick={() => handleClick(res.reservationId)}
          >
            annuleren
          </button>
        </td>
      </tr>
    );
  });

  const activeLoanElements = activeLoans.map((loan) => {
    return (
      <tr key={loan.isbn}>
        <td>
          <img src={loan.image} style={{ width: "50px" }} alt="None" />
        </td>
        <td>{loan.title}</td>
        <td>{loan.author}</td>
        <td>{loan.isbn}</td>
        <td>{loan.startDate}</td>
      </tr>
    );
  });

  const loanHistoryElements = loanHistory.map((loan) => {
    return (
      <tr key={loan.isbn}>
        <td>
          <img src={loan.image} style={{ width: "50px" }} alt="None" />
        </td>
        <td>{loan.title}</td>
        <td>{loan.author}</td>
        <td>{loan.isbn}</td>
        <td>{loan.startDate}</td>
        <td>{loan.endDate}</td>
      </tr>
    );
  });

  return (
    <div className="container mt-3">
      <h1>Mijn Reserveringen</h1>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">datum</th>
              <th scope="col">titel</th>
              <th scope="col">auteur</th>
              <th scope="col">isbn</th>
              <th scope="col">actie</th>
            </tr>
          </thead>
          <tbody>{reservationElements}</tbody>
        </table>
      </div>
      <h1>Boeken in mijn bezit</h1>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">afbeelding</th>
              <th scope="col">titel</th>
              <th scope="col">auteur</th>
              <th scope="col">isbn</th>
              <th scope="col">startdatum</th>
            </tr>
          </thead>
          <tbody>{activeLoanElements}</tbody>
        </table>
      </div>
      <h1>Leengeschiedenis</h1>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">afbeelding</th>
              <th scope="col">titel</th>
              <th scope="col">auteur</th>
              <th scope="col">isbn</th>
              <th scope="col">startdatum</th>
              <th scope="col">einddatum</th>
            </tr>
          </thead>
          <tbody>{loanHistoryElements}</tbody>
        </table>
      </div>
    </div>
  );
};
