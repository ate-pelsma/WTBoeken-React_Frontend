import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "./App";
import { Book } from "./Book";

export const Dashboard = () => {
    
    const [bookData, setBookData] = useState("")
    const {authenticated, setAuthenticated} = useContext(AppContext)

    const bookElements = Array.isArray(bookData) && bookData.map(book => {
        return (
            <Book key={book.id} book={book} />
        )
    })
    
    useEffect(() => {
        fetch("http://localhost:8080/book/all")
        .then(res => res.json())
        .then(data => {
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                arr.push(data[i]);
            }
            setBookData(arr)
        })
    }, [])

    if(!authenticated){
        return <Navigate replace to="/login" />;
    } else {
        return (
            <div>
                <h2>Welcome to the dashboard page</h2>
                {bookElements}
            </div>
        )
    }
}