import React from "react";
import { useState, useEffect } from "react";
import './style/dashboard.css';

import { useLocalState } from "./utils/setLocalStorage";
import { BookClassForDashboard } from "./BookClassForDashboard";


export const Dashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [bookData, setBookData] = useState([])
    const [searchInput, setSearchInput] = useState("")

    const filterBookElements = () => {
        const currentList = bookData.filter((book) => {
            return book.title.toLowerCase().includes(searchInput.toLowerCase())
        })
        return currentList
    }
    
    const bookElements = Array.isArray(bookData) && filterBookElements().map(book => {
        return (
            <BookClassForDashboard key={book.id} book={book} handleCreateReservation={createReservation}/>
        )
    })

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
            body: JSON.stringify({
                BookId: bookId
            })
        })
        .then((response) => {
            console.log(response);
            if(response.status === 200) return response.json();
        })
        .then((data) => {
            console.log(data)
        });
    }

    return (
        <div>
            <div>
                <button className="buttonBlack">Zwarte knop</button>
            </div>
            <div>
                <button className="buttonGreen">Groeneknop</button>
            </div>
            <div>
                <button className="buttonGrey">Grijzeknop</button>
            </div>
            <div className="dashboard-container">
                {bookElements}
            </div>

        </div>

    )
}