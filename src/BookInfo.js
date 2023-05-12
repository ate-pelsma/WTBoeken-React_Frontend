import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { WarningModal } from "./WarningModal"
import { BookCopies } from "./BookCopies"
import { useLocalState } from "./utils/setLocalStorage"
import { ToggleOff, ToggleOn  } from 'react-bootstrap-icons';

export const BookInfo = () => {

    const fetchUrl = "http://localhost:8080/"
    const { id } = useParams()
    const [book, setBook] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [modalElement, setModalElement] = useState("")
    const [cursor, setCursor] = useState("auto")
    const [jwt, setJwt] = useLocalState("", "jwt");

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
            headers: { 'Content-Type': 'application/json' , Authorization: `Bearer ${jwt}`},
            body: JSON.stringify(setArchived)
        })
        .then(r => r.json())
        .then(d => setBook(d))
    }

    const addCopy = () => {
        fetch(fetchUrl + "book/add/" + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` }
        })
        .then(r => r.json())
        .then(d => {
            setBook(d)
        })
    }

    const fetchBook = () => {
        fetch(fetchUrl + "book/" + id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            }
        })
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
                <div className="col-12 col-md-7">
                    <div className="row">
                        <div className="col-6 col-lg-3 mr-2 d-flex justify-content-center align-self-center">
                            <img src={book.image} alt="no image" style={{width: "120px"}}></img>
                        </div>
                        <div className="col-6 mt-4 d-flex justify-content-center flex-column">
                            <p className="text-left text-md-left">{book.title}</p>
                            <p className="text-left text-md-left">{book.isbn}</p>
                            <p className="text-left text-md-left">{book.author}</p>
                            <p className="text-left text-md-left">Gearchiveerd:
                                {book.archived ? ( 
                                    <ToggleOn style={{cursor: cursor}} onMouseOver={() => setCursor("pointer")} onMouseLeave={() => setCursor("auto")} onClick={handleArchiveClick} size={25} className="ms-1"/> ) : ( 
                                    <ToggleOff style={{cursor: cursor}} onMouseOver={() => setCursor("pointer")} onMouseLeave={() => setCursor("auto")} onClick={handleArchiveClick} size={25} className="ms-1"/> )}
                            </p>
                            <p className="text-left text-md-left">{book.tags}</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-5">
                    <div className="container">
                        <div className="row mt-3 mt-md-5">
                            <div className="col-6 d-flex justify-content-center"><button style={{width: "150px", height: "50px", padding: 0}} className="buttonGrey" onClick={handleArchiveClick}>{book.archived ? "Dearchiveren" : "Archiveren"}</button></div>
                            <div className="col-6 d-flex justify-content-center"><button style={{width: "150px", height: "50px", padding: 0}} className="buttonGrey" onClick={addCopyClick}>Exemplaar toevoegen</button></div>
                        </div>
                    </div>
                </div>
            </div>
            <BookCopies key={book.stock} id={id} />
        </div>
    )
}