import { useEffect, useState } from "react";
import fetchTemplate from "./Services/FetchTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalState } from "./utils/setLocalStorage";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./SearchBar";
import { WarningModal } from "./WarningModal";

export const LoanByCopy = () => {
  const [copyData, setCopyData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalElement, setModalElement] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const { id } = useParams();
  const navigate = useNavigate();

  const tableArrayBook = ["Kopie ID", "Titel", "Auteur", "ISBN"];

  const tableHeaderBook = tableArrayBook.map((i) => {
    return (
      <th key={i} scope="col">
        {i}
      </th>
    );
  });

  const handleClick = (user) => {
    setModalElement(
      <WarningModal
        toggleModal={setShowModal}
        setAction={() => assignCopyToUser(copyData.copyId, user.id)}
        modalText={`Kopie ${copyData.bookId}.${copyData.copyNumber} aan gebruiker ${user.name} uitlenen?`}
        redirect={true}
      />
    );
    setShowModal(true);
  };

  const assignCopyToUser = (copyId, userId) => {
    console.log(copyId);
    console.log(userId);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    };
    fetch(
      `http://localhost:8080/loan/save/${copyId}/${userId}`,
      requestOptions
    ).then((r) => console.log(r));
  };

  const userDataElement = filteredUsers.map((user) => {
    return (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.username}</td>
        <td>
          <button onClick={() => handleClick(user)}>Toewijzen</button>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    const fetchCopy = async () => {
      const response = await fetchTemplate(`/copy/${id}`, "GET", jwt);
      setCopyData(response);
    };
    fetchCopy();
    const fetchUsers = async () => {
      const response = await fetchTemplate("/user/all", "GET", jwt);
      setAllUsers(response);
      setFilteredUsers(response);
    };
    fetchUsers();
  }, [id, jwt]);

  return (
    <div className="container">
      {showModal && modalElement}
      <div className="row mt-3">
        <h1 className="col-12 col-md-9">Kopie informatie</h1>
        <div className="col-12 col-md-3 d-flex justify-content-md-end">
          <button className="buttonGrey" onClick={() => navigate(-1)}>
            Terug naar boek
          </button>
        </div>
      </div>
      <div className="row mt-2">
        <table className="table col-12">
          <thead>
            <tr>{tableHeaderBook}</tr>
          </thead>
          <tbody>
            {copyData && (
              <tr>
                <td>{`${copyData.bookId}.${copyData.copyNumber}`}</td>
                <td>{copyData.bookTitle}</td>
                <td>{copyData.bookAuthor}</td>
                <td>{copyData.bookIsbn}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <h1>Account zoeken</h1>
      <SearchBar
        key={searchInput}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        dataToFilter={allUsers}
        setFilteredData={setFilteredUsers}
        filterKeys={["name", "username"]}
        placeholder={"zoek gebruiker"}
      />
      <div className="col-6 mt-4">
        <table className="table col-6">
          <thead>
            <tr>
              <th scope="col">Naam</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>{userDataElement}</tbody>
        </table>
      </div>
    </div>
  );
};
