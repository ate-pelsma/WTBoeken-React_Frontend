import { useEffect, useState } from "react";
import fetchTemplate from "./Services/FetchTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalState } from "./utils/setLocalStorage";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./SearchBar";

export const LoanByCopy = () => {
  const [copyData, setCopyData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
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

  const handleClick = (userId) => {
    console.log(userId);
  };

  const userDataElement = filteredUsers.map((user) => {
    return (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.username}</td>
        <td>
          <button onClick={() => handleClick(user.id)}>Toewijzen</button>
        </td>
      </tr>
    );
  });

  const fetchCopy = async () => {
    const response = await fetchTemplate(`/copy/${id}`, "GET", jwt);
    setCopyData(response);
  };

  const fetchUsers = async () => {
    const response = await fetchTemplate("/user/all", "GET", jwt);
    setAllUsers(response);
    setFilteredUsers(response);
  };

  useEffect(() => {
    fetchCopy();
    fetchUsers();
  }, []);

  return (
    <div className="container">
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
