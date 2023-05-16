import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useLocalState } from "./utils/setLocalStorage";
import { useState, useEffect } from "react";
import { WarningModal } from "./WarningModal";
import fetchTemplate from "./Services/FetchTemplate";
import { Available } from "./Available";

export const LoanByReservation = () => {
  const { id } = useParams();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const navigate = useNavigate();
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [reservationData, setReservationData] = useState([]);
  const [reservationId, setReservationId] = useState([]);
  const [username, setUsername] = useState([]);
  const [book, setBook] = useState([]);
  const [copysAvailable, setCopysAvailable] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalElement, setModalElement] = useState("");

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLoanClick = (copyData, reservationId) => {
    console.log(reservationId);
    setModalElement(
      <WarningModal
        toggleModal={setShowModal}
        setAction={() => makeLoan(copyData.id, reservationId)}
        modalText={`Exemplaar ${copyData.copyNumber} van ${book.title} toewijzen aan ${username}?`}
      />
    );
    setShowModal(true);
  };

  const makeLoan = (copyId, reservationId) => {
    console.log(copyId, reservationId);
    // fetchTemplate(
    //   `/book/${reservationData.book.id}/copy/available`,
    //   "POST",
    //   jwt,
    //   (copy, user)
    // );
  };

  let fetchReservation = () => {
    fetchTemplate(`/reservations/${id}`, "GET", jwt).then((data) => {
      setReservationData(data);
      const { id, book, username } = data;
      setReservationId(id);
      setBook(book);
      setUsername(username);
    });
  };

  let fetchAvailableCopies = () => {
    fetchTemplate(`/book/${book.id}/copy/available`, "GET", jwt).then(
      (data) => {
        setCopysAvailable(data);
      }
    );
  };

  useEffect(() => {
    fetchReservation();
  }, []);

  useEffect(() => {
    if (Object.keys(reservationData).length) {
      fetchAvailableCopies();
      setLoadingStatus(true);
    }
  }, [reservationData]);

  const copyAvailableElements = copysAvailable.map((copy) => (
    <Available
      key={copy.id}
      data={copy}
      reservationId={reservationId}
      handleLoanClick={handleLoanClick}
    />
  ));

  if (loadingStatus === false) {
    return;
  }
  return (
    <div className="loan-by-reservation-container">
      {showModal && modalElement}
      <div className="row" style={{ width: "100%", marginTop: "2rem" }}>
        <div className="col-3 align-self-center" />
        <div className="col-6 align-self-center">
          <table className="table table-bordered table-striped align-middle text-center">
            <thead>
              <tr>
                <th>Reservering van</th>
                <th>Reserverings datum</th>
                <th>Boek Titel</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{username}</td>
                <td>{reservationData.reqDate}</td>
                <td>{book.title}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-3 d-flex justify-content-center">
          <img
            src={require("./images/Go-back-icon.png")}
            alt="Workingtalent Logo"
            className="back-arrow"
            onClick={handleGoBack}
          />
        </div>
      </div>
      <div
        className="row justify-content-center"
        style={{ width: "100%", marginTop: "5rem" }}
      >
        <div className="col-6 justify-content-center">
          {copysAvailable.length === 0 ? (
            <h2 className="text-center">
              Er zijn momenteel geen exemplaren beschikbaar van "{book.title}"
            </h2>
          ) : (
            <>
              <h2 className="text-center" style={{ marginBottom: "2rem" }}>
                Exemplaren beschikbaar van: "{book.title}"
              </h2>
              <table className="table table-bordered table-striped align-middle text-center">
                <thead>
                  <tr>
                    <th>Copy nummer</th>
                    <th className="text-center">Selecteer Copy</th>
                  </tr>
                </thead>
                <tbody>{copyAvailableElements}</tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
