import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocalState } from "./utils/setLocalStorage";
import { useState, useEffect } from "react";
import { WarningModal } from "./WarningModal";
import fetchTemplate from "./Services/FetchTemplate";
import { Available } from "./Available";

export const LoanByReservation = () => {
  const { id } = useParams()
  const [loadingStatus, setLoadingStatus] = useState(false)
  const navigate = useNavigate()
  const [jwt, setJwt] = useLocalState("", "jwt")
  const [reservationData, setReservationData] = useState([])
  const [bookData, setBookData] = useState([])
  const [userData, setUserData] = useState([])
  const [copysAvailable, setCopysAvailable] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalElement, setModalElement] = useState("")

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLoanClick = (copyData, reservationId) => {
    setModalElement(
      <WarningModal
        toggleModal={setShowModal}
        setAction={() => makeLoan(copyData.id, reservationId)}
        modalText={`Exemplaar ${copyData.copyNumber} van ${bookData.title} toewijzen aan ${userData.name}?`}
      />
    );
    setShowModal(true);
  };

  const makeLoan = (copyId, reservationId) => {
    // fetchTemplate(
    //   `/book/${reservationData.book.id}/copy/available`,
    //   "POST",
    //   jwt,
    //   (copy, user)
    // );
    fetchTemplate(`/loan/save/reservation/${reservationId}/${copyId}`, "POST", jwt)
    navigate("/reservations")
  };

  let fetchData = () => {
    const url = `/reservation/${id}`;
    fetchTemplate(url, "GET", jwt)
      .then(data => {
        setReservationData(data)
        
        return Promise.all([
          fetchTemplate(`/book/${data.bookid}`, "GET", jwt),
          fetchTemplate(`/user/${data.userid}`, "GET", jwt),
        ]);
      })
      .then(([bookData, userData]) => {
        setBookData(bookData)
        setUserData(userData)
        fetchTemplate(`/book/${bookData.id}/copy/available`, "GET", jwt).then(r => setCopysAvailable(r))
      })
      .catch(error => {
        console.error('Error fetching reservation:', error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(reservationData).length) {
      // fetchAvailableCopies();  
      setLoadingStatus(true);
    }
  }, [reservationData]);

  const copyAvailableElements = copysAvailable.map((copy) => (
    <Available
      key={copy.id}
      data={copy}
      reservationId={id}
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
                <th>Gebruiker</th>
                <th>Boek</th>
                <th>Aanvraagdatum</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="pointer-hover" onClick={() => navigate(`/users/details/${userData.id}`)}>{userData.name}</span></td>
                <td><span className="pointer-hover" onClick={() => navigate(`/books/details/${bookData.id}`)}>{bookData.title}</span></td>
                <td>{reservationData.reqDate}</td>
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
              Er zijn momenteel geen exemplaren beschikbaar van "{bookData.title}"
            </h2>
          ) : (
            <>
              <h2 className="text-center" style={{ marginBottom: "2rem" }}>
                Beschikbare exemplaren:
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
