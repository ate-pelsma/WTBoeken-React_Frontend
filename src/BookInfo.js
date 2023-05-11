import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { WarningModal } from "./WarningModal"
import { BookCopies } from "./BookCopies"

import { ToggleOff, ToggleOn  } from 'react-bootstrap-icons';

export const BookInfo = () => {

    const fetchUrl = "http://localhost:8080/"
    const { id } = useParams()
    const [book, setBook] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [modalElement, setModalElement] = useState("")

    const handleArchiveClick = () => {
        setModalElement(<WarningModal toggleModal={setShowModal} setAction={setArchived} modalText={"Weet je het zeker?"} />)
        setShowModal(true)
    }

    const addCopyClick = () => {
        setModalElement(<WarningModal toggleModal={setShowModal} setAction={addCopy} modalText={"Exemplaar toevoegen?"} />)
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
        <div className="container d-grid mt-3">
            {showModal && modalElement}
            <div className="row">
                <div className="col-6">
                    <div className="container">
                        <div className="row mt-3">
                            <div className="col-3">
                                <img src={book.image} alt="no image" style={{width: "120px"}}></img>
                            </div>
                            <div className="col-9">
                                <p>{book.title}</p>
                                <p>{book.isbn}</p>
                                <p>{book.author}</p>
                                <p>Gearchiveerd:
                                    {book.archived ? <ToggleOn size={25} className="ms-1"/> : <ToggleOff size={25} className="ms-1"/>}
                                </p>
                                <p>{book.tags}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="container d-grid">
                        <div className="row mt-5">
                            <div className="col-4 ms-auto"><button style={{width: "150px", height: "50px"}} className="buttonGrey" onClick={handleArchiveClick}>{book.archived ? "Dearchiveren" : "Archiveren"}</button></div>
                            <div className="col-4"><button style={{width: "150px", height: "50px"}} className="buttonGrey" onClick={addCopyClick}>Exemplaar toevoegen</button></div>
                        </div>
                    </div>
                </div>
            </div>
            <BookCopies key={book.stock} id={id} />
        </div>
    )
}