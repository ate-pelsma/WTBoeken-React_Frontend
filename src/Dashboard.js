import React from "react";
import { useState, useEffect } from "react";
import "./style/dashboard.css";
import { DashboardModal } from "./DashboardModal";
import { useLocalState } from "./utils/setLocalStorage";
import { BookClassForDashboard } from "./BookClassForDashboard";
import { DashboardModalSucces } from "./DashboardModalSucces";
import fetchTemplate from "./Services/FetchTemplate";

export const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [bookData, setBookData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalSucces, setShowModalSucces] = useState(false);
  const [modalElement, setModalElement] = useState("");
  const [modalElementSucces, setModalElementSucces] = useState("");

  function addReservationClick(book) {
    setModalElement(
      <DashboardModal
        toggleModal={setShowModal}
        setAction={() => createReservation(book.id)}
        modalText={`Reservering plaatsen voor: ${book.title}?`}
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

  let fetchBooks = () => {
    fetchTemplate(`/book/all`, "GET", jwt).then((data) => {
      setBookData(data);
    });
  };

  const filterBookElements = () => {
    const currentList = bookData.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        book.author.toLowerCase().includes(searchInput.toLowerCase()) ||
        book.isbn.includes(searchInput)
      );
    });
    return currentList;
  };

  const bookElements =
    Array.isArray(bookData) &&
    filterBookElements().map((book) => {
      return (
        <BookClassForDashboard
          key={book.id}
          book={book}
          handleCreateReservation={addReservationClick}
        />
      );
    });

  const rows = [];

  for (let i = 0; i < bookElements.length; i += 4) {
    const row = (
      <div className="row" style={{ width: "100%" }} key={i}>
        {bookElements.slice(i, i + 4)}
      </div>
    );
    rows.push(row);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  function createReservation(bookId) {
    fetchTemplate(`/reservations/save`, "POST", jwt, bookId).then(() => {
      ReservationSucces();
    });
  }

  return (
    <div className="dashboard-container">
      <div className="row" style={{ width: "100%" }}>
        <div className="col-12 col-md-3 align-self-center" />
        <div
          className="col-12 col-md-6 align-self-center"
          style={{
            marginTop: "2rem",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          <h1>Boeken Catalogus</h1>
        </div>
        <div className="col-12 col-md-3 align-self-center" />
        <div className="row" style={{ width: "100%" }}>
          <div className="col-12 col-md-3 align-self-center" />
          <div className="col-12 col-md-6 align-self-center">
            <input
              className="form-control rounded-pill"
              type="text"
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="zoek op boektitel, autheur etc.."
            ></input>
            <div className="col-12 col-md-3 align-self-center" />
          </div>
        </div>
      </div>
      {showModal && modalElement}
      {showModalSucces && modalElementSucces}

      {rows}
    </div>
  );
};
