import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style/dashboard.css";
import { useLocalState } from "./utils/setLocalStorage";
import { DashboardModal } from "./DashboardModal";
import { DashboardModalSucces } from "./DashboardModalSucces";
import fetchTemplate from "./Services/FetchTemplate.js";
import { ProgressBar } from "react-bootstrap";

export const BookDetailsDashboard = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState([]);
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [copyDetails, setCopyDetails] = useState([]);
  const [copysAvailable, setCopysAvailable] = useState(0);
  const [copysAvailablePercentage, setCopysAvailablePercentage] = useState(0);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalElement, setModalElement] = useState("");
  const [showModalSucces, setShowModalSucces] = useState(false);
  const [modalElementSucces, setModalElementSucces] = useState("");

  const handleGoBack = () => {
    navigate(-1);
  };

  function addReservationClick(bookDetails) {
    setModalElement(
      <DashboardModal
        toggleModal={setShowModal}
        setAction={() => createReservation(bookDetails)}
        modalText={`Reservering plaatsen voor: ${bookDetails.title}?`}
      />
    );
    setShowModal(true);
  }

  function ReservationSucces() {
    setModalElementSucces(
      <DashboardModalSucces
        toggleModalSucces={setShowModalSucces}
        modalText={`Reservering plaatsen gelukt!`}
      />
    );
    setShowModalSucces(true);
  }

  function createReservation(bookDetails) {
    fetchTemplate(`/reservation/save`, "POST", jwt, bookDetails.id).then(() => {
      ReservationSucces();
    });
  }

  let fetchBook = () => {
    fetchTemplate(`/book/${id}`, "GET", jwt).then((data) => {
      setBookDetails(data);
    });
  };

  let fetchCopies = () => {
    fetchTemplate(`/book/${id}/copy/all`, "GET", jwt).then((data) => {
      setCopyDetails(data);
    });
  };

  useEffect(() => {
    fetchBook();
    fetchCopies();
  }, []);

  useEffect(() => {
    let count = 0;
    for (let i = 0; i < copyDetails.length; i++) {
      if (!copyDetails[i].loaned) {
        count++;
      }
    }
    setCopysAvailable(count);
    setCopysAvailablePercentage((count / copyDetails.length) * 100);
  }, [copyDetails]);

  const availabilityBar =
    copysAvailablePercentage === 0 ? (
      <ProgressBar
        striped
        variant="danger"
        now={5}
        label={`${copysAvailable}/${copyDetails.length}`}
      />
    ) : copysAvailablePercentage < 26 ? (
      <ProgressBar
        striped
        variant="warning"
        now={copysAvailablePercentage}
        label={`${copysAvailable}/${copyDetails.length}`}
      />
    ) : (
      <ProgressBar
        striped
        variant="success"
        now={copysAvailablePercentage}
        label={`${copysAvailable}/${copyDetails.length}`}
      />
    );

  return (
    <div className="book-container">
      {showModalSucces && modalElementSucces}
      {showModal && modalElement}
      <div className="row">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img
            src={bookDetails.image}
            alt="None"
            className="img-fluid"
            id="book-image"
          ></img>
        </div>
        <div className="col-12 col-md-6">
          <div className="row justify-content-evenly">
            <div className="bookDetails col-8 d-flex flex-column justify-content-center">
              <h1>{bookDetails.title}</h1>
              <h2>Autheur:</h2>
              <span>{bookDetails.author}</span>
              <h2>ISBN:</h2>
              <span>{bookDetails.isbn}</span>
              <h2>Beschikbaar:</h2>
              {availabilityBar}
              <button
                className="buttonBlack"
                style={{
                  marginTop: "2.5rem",
                  alignSelf: "center",
                  justifySelf: "center",
                }}
                onClick={() => {
                  addReservationClick(bookDetails);
                }}
              >
                <h3>Reserveer!</h3>
              </button>
            </div>
            <div className="col-4">
              <img
                src={require("./images/Go-back-icon.png")}
                alt="Workingtalent Logo"
                className="back-arrow"
                onClick={handleGoBack}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
