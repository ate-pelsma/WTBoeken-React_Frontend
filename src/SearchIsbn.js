import { useState } from "react";
import { CreateBook } from "./CreateBook";
import { Search } from "react-bootstrap-icons";
import { useLocalState } from "./utils/setLocalStorage";
import { SearchBar } from "./SearchBar";

export const SearchIsbn = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [bookObject, setBookObject] = useState(null);
  const [currentIsbn, setCurrentIsbn] = useState("");
  const [alert, setAlert] = useState("");
  const [duplicateBook, setDuplicateBook] = useState(false);

  const handleClick = () => {
    getAllBooks();
  };

  const getAllBooks = () => {
    fetch("http://localhost:8080/book/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((r) => r.json())
      .then((d) => {
        if (dataIsDuplicate(d)) {
          setAlert("Boek al een keer opgeslagen");
          setBookObject(null);
        } else {
          setAlert("");
          fetchData();
        }
      });
  };

  const dataIsDuplicate = (d) => {
    for (let book of d) {
      if (book.isbn === currentIsbn) {
        return true;
      }
    }
    return false;
  };

  const fetchData = () => {
    fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${currentIsbn}&jscmd=data&format=json`
    )
      .then((r) => r.json())
      .then((d) => {
        for (let key in d) {
          let responseData = d[key];
          setBookObject(responseData);
        }
        if (
          Object.keys(d).length === 0 &&
          Object.getPrototypeOf(d) === Object.prototype
        ) {
          setAlert("Onbekend ISBN nummer");
        }
      });
  };

  const alertElement = (
    <div className="text-center" role="alert">
      <p className="fs-6">{alert}</p>
    </div>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="input-group mt-3 d-flex justify-content-center p-3">
          <input
            className="rounded-pill col-12 col-md-5"
            value={currentIsbn}
            onChange={(e) => setCurrentIsbn(e.target.value)}
            type="text"
            placeholder="type isbn here"
          ></input>
          <span
            style={{ marginLeft: "-30px", zIndex: 1, marginTop: "3px" }}
            className="input-group-append"
          >
            <Search />
          </span>
        </div>
        <div className="d-flex justify-content-center">
          <button className="buttonGrey" type="button" onClick={handleClick}>
            Zoek ISBN nummer
          </button>
        </div>
        {alertElement}
      </div>
      <div className="row mt-3">
        <CreateBook
          key={bookObject}
          data={bookObject}
          isbn={currentIsbn}
          alert={alert}
        />
      </div>
    </div>
  );
};
