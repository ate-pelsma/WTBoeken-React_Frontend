import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { WarningModal } from "./WarningModal"
import { BookCopies } from "./BookCopies"

export const BookInfo = () => {

    const fetchUrl = "http://localhost:8080/"
    const { id } = useParams()
    const [book, setBook] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [modalElement, setModalElement] = useState("")

    const handleArchiveClick = () => {
        setModalElement(<WarningModal toggleModal={setShowModal} setAction={setArchived} />)
        setShowModal(true)
    }

    const addCopyClick = () => {
        setModalElement(<WarningModal toggleModal={setShowModal} setAction={addCopy} />)
        setShowModal(true)
    }

    const setArchived = () => {
        const setArchived = {archived: !book.archived}
        fetch(fetchUrl + "book/update/" + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(setArchived)
        })
        .then(r => r.json())
        .then(d => setBook(d))
    }

    const addCopy = () => {
        fetch(fetchUrl + "book/add/" + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(r => r.json())
        .then(d => {
            console.log(d)
            setBook(d)
        })
    }

    const fetchBook = () => {
        fetch(fetchUrl + "book/" + id)
        .then(r => r.json())
        .then(d => setBook(d))
    }

    useEffect(() => {
        fetchBook()
    }, [])

    return (
        <div className="container">
            {showModal && modalElement}
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
                    <div className="d-flex justify-content-center">
                        <div className="d-inline-block">
                            <div>Gearchiveerd</div>
                        </div>
                        <div className="d-inline-block">
                            <input style={{margin: "5px"}} type="checkbox" checked={book.archived ? true : false} readOnly={true}></input>
                        </div>
                    </div>
                    <div><button onClick={handleArchiveClick}>{book.archived ? "Boek dearchiveren" : "Boek archiveren"}</button></div>
                    <div><button onClick={addCopyClick}>Exemplaar toevoegen</button></div>
                </div>
            </div>
            <BookCopies key={book.stock} id={id} />
        </div>
    )
}