import React from "react";
import { useState, useEffect } from "react";
import './style/dashboard.css';
import { DashboardModal } from "./DashboardModal"
import { useLocalState } from "./utils/setLocalStorage";
import { BookClassForDashboard } from "./BookClassForDashboard";
import { DashboardModalSucces } from "./DashboardModalSucces";


export const Dashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [bookData, setBookData] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [showModalSucces, setShowModalSucces] = useState(false)
    const [modalElement, setModalElement] = useState("")
    const [modalElementSucces, setModalElementSucces] = useState("")

    function addReservationClick(book){
        setModalElement(<DashboardModal toggleModal={setShowModal} setAction={() => createReservation(book.id)} modalText={`Reservering plaatsen voor: ${book.title}?`} />)
        setShowModal(true)
    }

    function ReservationSucces(){
        setModalElementSucces(<DashboardModalSucces toggleModalSucces={setShowModalSucces} modalText={`Reservering plaatsen gelukt!`} />)
        setShowModalSucces(true)
    }

    const filterBookElements = () => {
        const currentList = bookData.filter((book) => {
            return book.title.toLowerCase().includes(searchInput.toLowerCase())
        })
        return currentList
    }
    
    const bookElements = Array.isArray(bookData) && filterBookElements().map(book => {
        return (
            <BookClassForDashboard key={book.id} book={book} handleCreateReservation={addReservationClick}/>
        )
    })

    const rows = [];

    for (let i = 0; i < bookElements.length; i += 4) {
        const row = (
            <div className="row" style={{width: '100%'}} key={i}>
                {bookElements.slice(i, i + 4)}
            </div>
        );
        rows.push(row);
    }

    let fetchBooks = () => {
        fetch("http://localhost:8080/book/all",
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            setBookData(data)
        })
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    function createReservation(bookId){
        fetch("http://localhost:8080/reservations/save", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "POST",
            body: JSON.stringify(bookId)
        })
        .then((response) => {
            if(response.status === 200) {
                ReservationSucces();
                return response.json();
            }
        })
        .then((data) => {
            console.log(data)
        });
    }

    return (
            <div className="dashboard-container">
                {showModal && modalElement}
                {showModalSucces && modalElementSucces}
                {rows}
            </div>
    )
}