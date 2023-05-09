import { useState, useEffect } from "react";
import { Book } from "./Book";
import { SearchIsbn } from "./SearchIsbn";
import { useLocalState } from './utils/setLocalStorage'

import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";

export const BookView = () => {
    // const [jwt, setJwt] = useLocalState("", "jwt");

    const [bookData, setBookData] = useState([])
    const [createBook, setCreateBook] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const navigate = useNavigate();

    const tableArray = ["afbeelding", "titel", "auteur", "isbn", "aantal", "tags"]
    const tableNames = tableArray.map(i => {
        return (
            <th scope="col">{i}</th>
        )
    })

    const filterBookElements = () => {
        const currentList = bookData.filter((book) => {
            return book.title.toLowerCase().includes(searchInput.toLowerCase())
        })
        return currentList
    }

    const bookElements = Array.isArray(bookData) && filterBookElements().map(book => {
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
        // ,
        // {
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${jwt}`,
        //     },
        //     method: "GET",
        // }
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
            <h2>Welcome to the book catalogus page</h2>
            
                <div className="row">
                    <div className="col-8 justify-content-center">
                    <div className="ms-4">
                        <input type="text" onChange={(e) => setSearchInput(e.target.value)} placeholder="search for title here"></input>
                    </div>
                    </div>
                    <div className="col-4 d-flex flex-row-reverse">
                        <button onClick={handleClick}>Add New Book</button> 
                    </div>
                
            </div>
            <div className="p-4">
                <table className="table">
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
