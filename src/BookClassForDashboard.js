import React from "react";
import { useNavigate } from "react-router-dom";
import { Dot } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import fetchTemplate from "./Services/FetchTemplate";
import { useLocalState } from "./utils/setLocalStorage";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export const BookClassForDashboard = ({ book, handleCreateReservation }) => {
  const navigate = useNavigate();
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [copyDetails, setCopyDetails] = useState([]);
  const [copysAvailable, setCopysAvailable] = useState(0);

  const { id, image, title } = book;
  const handleClick = () => {
    navigate(`/dashboard/books/details/${id}`);
  };

  let fetchCopies = () => {
    fetchTemplate(`/book/${id}/copy/all`, "GET", jwt).then((data) => {
      setCopyDetails(data);
    });
  };

  useEffect(() => {
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
  }, [copyDetails]);

  const availabilityDot =
    copysAvailable === 0 ? (
      <span className="dotRed" />
    ) : copysAvailable === 1 ? (
      <span className="dotOrange" />
    ) : (
      <span className="dotGreen" />
    );

  return (
    <div className="col-12 col-md-3 align-items-center">
      <div className="dashboard-book-container d-flex flex-column justify-content-center align-items-center">
        <div className="row justify-content-center" style={{ width: "100%" }}>
          <img
            src={image}
            alt="None"
            onClick={handleClick}
            className="dashboard-image"
          ></img>
          <OverlayTrigger
            key="bottom"
            placement="bottom"
            overlay={
              <Tooltip id={`tooltip-bottom`}>
                {copysAvailable} out of {copyDetails.length} left
              </Tooltip>
            }
          >
            {availabilityDot}
          </OverlayTrigger>
        </div>
        <div className="dashboard-title">
          <p>{title}</p>
        </div>
        <button
          onClick={() => handleCreateReservation(book)}
          className="buttonGrey"
        >
          <p>Reserveer!</p>
        </button>
      </div>
    </div>
  );
};
