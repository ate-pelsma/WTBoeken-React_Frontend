import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "./App";
import { Book } from "./Book";
import { SearchIsbn } from "./SearchIsbn";

export const Dashboard = () => {
    
    const [bookData, setBookData] = useState("")
    const {authenticated, setAuthenticated} = useContext(AppContext)
    const [bookOverview, setBookOverview] = useState(true)
    const [createBook, setCreateBook] = useState(false)

    const bookElements = Array.isArray(bookData) && bookData.map(book => {
        return (
            <Book key={book.id} book={book} />
        )
    })
    
    let fetchBooks = () => {
        fetch("http://localhost:8080/book/all")
        .then(res => res.json())
        .then(data => {
            setBookData(data)
        })
    }

    const handleClick = () => {
        setCreateBook(prevState => {
            return !prevState
        })
    }

    useEffect(() => {
        fetchBooks()
    }, [bookData])

    if(!authenticated){
        return <Navigate replace to="/login" />;
    } else {
        return (
            <div>
                <button onClick={handleClick}>Add Book</button>
                <h2>Welcome to the dashboard page</h2>
                {bookElements}
                <p></p>
                <SearchIsbn createBook={createBook}/>
            </div>
        )
    }
}