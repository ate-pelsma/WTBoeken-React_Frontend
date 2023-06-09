import { useEffect } from "react";
import { Search } from "react-bootstrap-icons";

export const SearchBar = ({
  searchInput,
  setSearchInput,
  dataToFilter,
  setFilteredData,
  filterKeys,
  placeholder,
}) => {
  const keyText = (keys, object) => {
    let text = "";
    keys.forEach((key) => {
      text += " " + object[key];
    });
    return text.toLowerCase();
  };

  const filterFunction = () => {
    let search = searchInput.toLowerCase();
    return dataToFilter.filter((object) => {
      return keyText(filterKeys, object).includes(search);
    });
  };

  useEffect(() => {
    setFilteredData(filterFunction());
  }, []);

  return (
    <div className="mt-3 d-flex align-items-center">
      <span style={{ width: "5px" }}></span>
      <input
        style={{ minWidth: "400px" }}
        autoFocus={true}
        className="rounded-pill col-12 col-md-6 p-2"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        type="text"
        placeholder={placeholder}
      ></input>
      <span
        style={{ marginLeft: "-30px" }}
        className="input-group-append"
      >
        <Search />
      </span>
    </div>
  );
};
