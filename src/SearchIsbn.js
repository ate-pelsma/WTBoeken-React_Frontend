import { useState, useEffect } from "react";
import { BookInfo } from "./BookInfo";

export const SearchIsbn = () => {
    
    const [bookObject, setBookObject] = useState(null)
    const [currentIsbn, setCurrentIsbn] = useState("")

    const fetchBook = () => {
        fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${currentIsbn}&jscmd=data&format=json`)
            .then(r => r.json())
            .then(d => {
                for(let key in d){
                    const responseData  = d[key];
                    setBookObject(responseData)
                }
            })
    }

    const element = bookObject ? <BookInfo data={bookObject} /> : <h1>No book found yet</h1>
    
    // useEffect(() => {
        
    // }, [bookObject])

    return (
        <div>
            <input value={currentIsbn} onChange={(e) => setCurrentIsbn(e.target.value)} type="text" placeholder="type isbn here"></input>
            <button type="button" onClick={fetchBook}></button>
            {element}
        </div>
    )
}