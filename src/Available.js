import { useNavigate } from "react-router";
import { WarningModal } from "./WarningModal";
import { useEffect, useState } from "react";
import { useLocalState } from "./utils/setLocalStorage";
import fetchTemplate from "./Services/FetchTemplate";

import { Dot } from "react-bootstrap-icons";

export const Available = ({ data, reservationId, handleLoanClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalElement, setModalElement] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    <>
      <tr>
        <th className="align-middle" scope="row">
          {data.copyNumber}
        </th>
        <td className="d-flex justify-content-md-center align-middle">
          <button
            onClick={() => handleLoanClick(data, reservationId)}
            style={{ minWidth: "110px", padding: "1rem" }}
            className="buttonGrey"
          >
            Toewijzen
          </button>
        </td>
      </tr>
    </>
  );
};
