import { useState } from "react";
import { CreateBook } from "./CreateBook";

export const SearchIsbn = () => {
    
    const [bookObject, setBookObject] = useState(null)
    const [currentIsbn, setCurrentIsbn] = useState("")
    const [alert, setAlert] = useState(false)

    const fetchData = () => {
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

    const alertElement = alert ? <div className="text-center" role="alert"><p className="fs-6">Onbekend ISBN nummer</p></div> : <div></div>

    return (
        <div className="container">
            <div>
                <input value={currentIsbn} onChange={(e) => setCurrentIsbn(e.target.value)} type="text" placeholder="type isbn here"></input>
                <button type="button" onClick={fetchData}>Search ISBN number</button>
                {alertElement}
            </div>
            <div>
                <CreateBook data={bookObject} isbn={currentIsbn} alert={alert} />
            </div>
        </div>
    )
}