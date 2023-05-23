import { useNavigate } from "react-router";
import { WarningModal } from "./WarningModal";
import { useEffect, useState } from "react";
import { setMaxListeners } from "events";
import { useLocalState } from "./utils/setLocalStorage";

import { Dot } from "react-bootstrap-icons";

export const Copy = ({ data, bookid, setCopyDetails }) => {
  const { id, copyNumber, loaned, inactive } = data;
  const [showModal, setShowModal] = useState(false);
  const [modalElement, setModalElement] = useState("");
  const [copyData, setCopyData] = useState(data);
  const [copyDto, setCopyDto] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate();

  const handleInactiveClick = () => {
    setModalElement(
      <WarningModal
        toggleModal={setShowModal}
        setAction={setInactive}
        modalText={inactive ? "Boek weer activeren?" : "Boek deactiveren?"}
      />
    );
    setShowModal(true);
  };

  const handleReservationClick = () => {
    navigate(`/copies/${id}`);
  };

  const handleReservationClickForInactiveCopy = () => {
    setModalElement(
      <WarningModal
        toggleModal={setShowModal}
        setAction={handleReservationClick}
        modalText={"Inactief boek uitlenen?"}
      />
    );
    setShowModal(true);
  };

  const setInactive = () => {
    fetch("http://localhost:8080/copy/inactive/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((r) => r.json())
      .then((d) => {
        setCopyData(d);
        reRenderParent(d);
      });
  };

  const reRenderParent = (d) => {
    const currentCopy = copyNumber - 1;
    setCopyDetails((prevState) => {
      prevState[currentCopy] = d;
      return prevState;
    });
  };

  const fetchCopy = () => {
    fetch(`http://localhost:8080/copy/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((r) => r.json())
      .then((d) => setCopyDto(d));
  };

  useEffect(() => {
    fetchCopy();
  }, []);

  const dotElement = copyData.inactive ? (
    <Dot fill="red" size={60} />
  ) : loaned ? (
    <Dot fill="orange" size={60} />
  ) : (
    <Dot fill="green" size={60} />
  );

  const loanCopyButton = (
    <button
      onClick={
        copyData.inactive
          ? handleReservationClickForInactiveCopy
          : handleReservationClick
      }
      style={{ minWidth: "110px", padding: "2px", minHeight: "40px" }}
      className="buttonGrey"
    >
      toewijzen
    </button>
  );

  return (
    <tr>
      <th className="align-middle" scope="row">
        {copyNumber}
      </th>
      <td className="align-middle">{dotElement}</td>
      <td className="align-middle">{copyDto.activeLoanName}</td>
      <td className="align-middle">{copyData.inactive ? "ja" : "nee"}</td>
      <td className="align-middle">
        <div className="d-flex justify-content-center">
          <button
            onClick={handleInactiveClick}
            style={{ minWidth: "110px" }}
            className="buttonGrey"
          >
            {copyData.inactive ? "activeren" : "inactiveren"}
          </button>
          {!copyData.inactive && loanCopyButton}
          <button
            onClick={() => navigate(`/copy/details/${id}`)}
            className="buttonGrey"
            style={{ minWidth: "110px" }}
          >
            details
          </button>
        </div>
      </td>
      <td>{showModal && modalElement}</td>
    </tr>
  );
};
