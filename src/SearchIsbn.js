import { useState, useEffect } from "react";
import { CreateBook } from "./CreateBook";

export const SearchIsbn = ({createBook}) => {
    
    const [bookObject, setBookObject] = useState(null)
    const [currentIsbn, setCurrentIsbn] = useState("")
    const [alert, setAlert] = useState(false)

    const fetchBook = () => {
        fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${currentIsbn}&jscmd=data&format=json`)
            .then(r => r.json())
            .then(d => {
                for(let key in d){
                    let responseData  = d[key];
                    setBookObject(responseData)
                    setAlert(false)
                }
                if(Object.keys(d).length === 0
                && Object.getPrototypeOf(d) === Object.prototype){
                    setAlert(true)
                }
            })
    }

    const rerenderBook = bookObject ? <CreateBook data={bookObject} isbn={currentIsbn} /> : <h1>No book found yet</h1>
    const visibility = createBook ? {visibility: 'visible'} : {visibility: 'hidden'}
    const alertElement = alert ? <div>Alert message</div> : <div></div>

    // useEffect(() => {
    //     console.log("rerender")
    //     console.log(alert)
    // }, [alert])

    return (
        <div style={visibility}>
            <input value={currentIsbn} onChange={(e) => setCurrentIsbn(e.target.value)} type="text" placeholder="type isbn here"></input>
            <button type="button" onClick={fetchBook}></button>
            {alertElement}
            <CreateBook data={bookObject} isbn={currentIsbn} alert={alert} />
        </div>
    )
}