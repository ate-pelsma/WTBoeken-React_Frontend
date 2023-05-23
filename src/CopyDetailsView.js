import { useParams } from "react-router-dom";
import { useLocalState } from "./utils/setLocalStorage";
import { useEffect, useState } from "react";
import fetchTemplate from "./Services/FetchTemplate";

export const CopyDetailsView = () => {
  const { id } = useParams("id");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [copyDetails, setCopyDetails] = useState("");
  const [loanHistory, setLoanHistory] = useState([]);

  const setCopyToInactive = () => {
    fetchTemplate("/copy/inactive/" + id, "PUT", jwt).then((d) => {
      setCopyDetails((prevState) => ({
        ...prevState,
        inactive: d.inactive,
      }));
    });
  };

  const fetchDetails = () => {
    fetchTemplate("/copy/details/" + id, "GET", jwt).then((r) => {
      setCopyDetails(r);
      setLoanHistory(r["loanList"]);
    });
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const loanHistoryElements = loanHistory.map((loan) => {
    return (
      <tr key={loan.id}>
        <td>{loan.userName}</td>
        <td>{loan.startDate}</td>
        <td>{!loan.endDate ? "kopie is nog uitgeleend" : loan.endDate}</td>
      </tr>
    );
  });

  return (
    <div className="container">
      <div className="row d-flex align-items-md-center justify-content-center mt-4">
        <div className="col-12 col-md-6">
          <div className="row">
            <div className="col-12 col-md-4">
              <img
                style={{ maxWidth: "150px" }}
                src={copyDetails.bookImage}
                alt="None"
              />
            </div>
            <div className="col-12 col-md-6">
              <div className="col-12 mt-3">Titel: {copyDetails.bookTitle}</div>
              <div className="col-12 mt-3">
                Auteur: {copyDetails.bookAuthor}
              </div>
              <div className="col-12 mt-3">ISBN: {copyDetails.bookIsbn}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <h4>
            copy ID: {copyDetails.bookId}.{copyDetails.copyNumber}
          </h4>
        </div>
        <div className="col-12 col-md-3">
          <div>
            <button onClick={setCopyToInactive} className="buttonGreen">
              {copyDetails.inactive ? "activeren" : "inactiveren"}
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <h4>Uitleengeschiedenis</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">account</th>
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
