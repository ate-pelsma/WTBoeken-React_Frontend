import { useState, useEffect } from "react"
import { WarningModal } from "./WarningModal"

export const BookInfo = ({bookid}) => {

    const fetchUrl = "http://localhost:8080/"
    const [book, setBook] = useState("")
    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        setShowModal(true)
    }

    const toggleArchived = () => {
        const setArchived = {archived: !book.archived}
        fetch(fetchUrl + "book/update/" + bookid, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(setArchived)
        })
        .then(r => r.json())
        .then(d => setBook(d))
    }

    const fetchBook = () => {
        fetch(fetchUrl + "book/" + bookid)
        .then(r => r.json())
        .then(d => setBook(d))
    }

    useEffect(() => {
        fetchBook()
    }, [])

    return (
        <div>
            {showModal && <WarningModal toggleModal={setShowModal} toggleArchived={toggleArchived}/>}
            <div className="d-flex mt-5">
                <div className="d-inline-block">
                    <img src={book.image} alt="no image" style={{width: "100px"}}></img>
                </div>
                <div className="d-inline-block p-2">
                    <p>{book.title}</p>
                    <p>{book.isbn}</p>
                    <p>{book.author}</p>
                    <p>{book.tags}</p>
                </div>
                <div className="d-inline-block p-2">
                    <div className="d-flex">
                        <div className="d-inline-block">
                            <div>Gearchiveerd</div>
                        </div>
                        <div className="d-inline-block">
                            <input style={{margin: "5px"}} type="checkbox" checked={book.archived ? true : false} readOnly={true}></input>
                        </div>
                    </div>
                    <div><button onClick={handleClick}>{book.archived ? "Boek dearchiveren" : "Boek archiveren"}</button></div>
                </div>
            </div>
        </div>
    )
}