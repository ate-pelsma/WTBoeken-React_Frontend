import { useState, useEffect } from "react";
import { Book } from "./Book";
import { SearchIsbn } from "./SearchIsbn";
import { useLocalState } from './utils/setLocalStorage'

import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { Search } from "react-bootstrap-icons";

export const BookView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    const [bookData, setBookData] = useState([])
    const [createBook, setCreateBook] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const navigate = useNavigate();

    const tableArray = ["afbeelding", "titel", "auteur", "isbn", "aantal", "tags"]
    const tableNames = tableArray.map(i => {
        return (
            <th key={i} scope="col">{i}</th>
        )
    })

    const filterBookElements = () => {
        const currentList = bookData.filter((book) => {
            return (
                book.title.toLowerCase().includes(searchInput.toLowerCase()) || book.author.toLowerCase().includes(searchInput.toLowerCase())
                || book.isbn.includes(searchInput)
            )
        })
        return currentList
    }

    const bookElements = filterBookElements().map(book => {
        return (
            <Book key={book.id} book={book} />
        )
    })

    // let visibility = visible ? 'block' : 'none'
    
    const handleClick = () => {
        navigate("/books/create")
    }

    let fetchBooks = () => {
        fetch("http://localhost:8080/book/all"
        ,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        }
        )
        .then(res => res.json())
        .then(data => {
            setBookData(data)
        })
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    return (
        <div className="container">
            <h2 className="text-center mt-3">Admin boek overzicht</h2>
            <div className="row">
                <div className="col-6 justify-content-center">
                    <div className="ms-4 mt-3 input-group">
                        <input className="form-control rounded-pill" type="text" onChange={(e) => setSearchInput(e.target.value)} placeholder="zoek naar een boek"></input>
                        <span style={{marginLeft: "-40px", zIndex: 1}} className="input-group-append mt-2"><Search /></span>
                    </div>
                </div>
                <div className="col-6 d-flex flex-row-reverse">
                    <div className="p-1"><button className="buttonBlack me-0" onClick={handleClick}>Nieuw Boek</button></div>
                </div>
            </div>
            <div className="p-4 d-flex">
                <table className="table col-10">
                    <thead>
                        <tr>
                            {tableNames}
                        </tr>
                    </thead>
                    <tbody>
                        {bookElements}
                    </tbody>
                </table>
            </div>
        </div>
    )
} 
