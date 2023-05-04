import { useState, useEffect } from "react";
import { Book } from "./Book";
import { SearchIsbn } from "./SearchIsbn";

import 'bootstrap/dist/css/bootstrap.min.css';

export const BookView = () => {

    const [bookData, setBookData] = useState("")
    const [createBook, setCreateBook] = useState(false)

    const bookElements = Array.isArray(bookData) && bookData.map(book => {
        return (
            <Book key={book.id} book={book} />
        )
    })

    // let visibility = visible ? 'block' : 'none'
    
    const handleClick = () => {
        setCreateBook(prevState => {
            return !prevState
        })
    }

    let fetchBooks = () => {
        fetch("http://localhost:8080/book/all")
        .then(res => res.json())
        .then(data => {
            setBookData(data)
        })
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    return (
        <div>
            <h2>Welcome to the book catalogus page</h2>
            <div className="d-flex flex-row">
                {bookElements}
            </div>
            <p></p>
            <button onClick={handleClick}>Add New Book</button>
            <SearchIsbn createBook={createBook}/>
        </div>
    )
} 
