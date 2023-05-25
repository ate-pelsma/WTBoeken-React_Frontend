import { useState, useEffect } from "react"
import { User } from "./User"
import { useNavigate } from "react-router-dom"
import { useLocalState } from "./utils/setLocalStorage";
import { SearchBar } from "./SearchBar";
import { WarningModal } from "./WarningModal";

export const UserView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const navigate = useNavigate()
    const [userData, setUserData] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [modalElement, setModalElement] = useState("");
    let inactiveId

    let fetchUsers = () => {
        fetch("http://localhost:8080/user/all", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        })
        .then(res => res.json())
        .then(data => { 
            setUserData(data)
            setFilteredData(data)
        } )
    }
    
    const handleUserInactive = (id) => {
        inactiveId = id
        setModalElement(
            <WarningModal
              toggleModal={setShowModal}
              setAction={setInactive}
              modalText={"Weet je zeker dat je dit account wilt deactiveren?"}
            />
          );
          setShowModal(true); 
    }

    const setInactive = () => {
        fetch("http://localhost:8080/user/inactive/" + inactiveId, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        })
        // .then((r) => r.json())
        .then(() => fetchUsers())
    }

    const userTableData = filteredData.filter(user => user.name != "").map(user => {
        return <User key={user.id} user={user} handleUserInactive={handleUserInactive}/>
    })

    useEffect(fetchUsers, [])

    return (
        <div className="container">
        {showModal && modalElement}
            <div className="p-4">
                <div className="row align-middle">
                    <div className="col-12 justify-content-center justify-content-md-start col-md-6">
                        <SearchBar
                            key={searchInput}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            dataToFilter={userData}
                            setFilteredData={setFilteredData}
                            filterKeys={["name", "username", "permissions"]}
                            placeholder={"zoek gebruiker hier"}
                        />
                    </div>
                    <div className="col-12 justify-content-center d-flex justify-content-md-end col-md-6">
                        <button className="btn buttonGreen" onClick={() => navigate("/users/create")}>Gebruiker toevoegen</button>
                    </div>
                    
                </div>
                <table className="table table-striped align-middle text-center">
                    <thead>
                        <tr>
                            <th>Naam</th>
                            <th>email</th>
                            <th>Functie</th>
                            <th style={{ width: "40px" }}></th>
                            <th style={{ width: "80px" }}>Deactiveren</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userTableData}
                    </tbody>
                </table>
            </div>
        </div>
    )
}