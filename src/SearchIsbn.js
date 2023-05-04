import { useState } from "react";
import { CreateBook } from "./CreateBook";

export const SearchIsbn = ({createBook}) => {
    
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

    const visibility = createBook ? {visibility: 'visible'} : {visibility: 'hidden'}
    const alertElement = alert ? <div>Alert message</div> : <div></div>

    return (
        <div style={visibility}>
            <input value={currentIsbn} onChange={(e) => setCurrentIsbn(e.target.value)} type="text" placeholder="type isbn here"></input>
            <button type="button" onClick={fetchData}></button>
            {alertElement}
            <CreateBook data={bookObject} isbn={currentIsbn} alert={alert} />
        </div>
    )
}