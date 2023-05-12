import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useLocalState } from "./utils/setLocalStorage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { WarningModal } from "./WarningModal";

export const CreateBook = ({data, isbn, alert}) => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    const emptyBook = {
        title: "",
        isbn: "",
        image: "",
        author: "",
        stock: 0
    }

    const [newBook, setNewBook] = useState(emptyBook)
    const navigate = useNavigate();
    const [modalElement, setModalElement] = useState("")
    const [showModal, setShowModal] = useState(false)

    const updateBookForm = () => {
        if(data){
            const imgUrl = data.cover ? data.cover.medium : "https://images.cdn3.stockunlimited.net/preview1300/book-icon_1648785.jpg"
            let subtitle = data.subtitle ? data.subtitle : ""
            setNewBook({
                title: data.title + " " + subtitle,
                isbn: isbn,
                image: imgUrl,
                author: showAuthors(),
                stock: 1
            })

            buildImgElement()
        } 
        if(alert === true){
            setNewBook(emptyBook)
        }
    }

    const buildImgElement = () => {
        const imgElement = newBook.image ? <img src={newBook.image} alt="No Image" style={{width: "200px"}}></img> : <div></div>
        return imgElement
    }

    useEffect(() => {
        updateBookForm()
    }, [data, alert])

    const showAuthors = () => {
        let authorString = data.authors[0].name
        for(let i = 1; i < data.authors.length; i++){
            authorString += ", " + data.authors[i].name
        }
        return authorString
    }

    const setTitle = (i) => {
        setNewBook({
            ...newBook,
            title: i
        })
    }

    const setIsbn = (i) => {
        setNewBook({
            ...newBook,
            isbn: i
        })
    }

    const setImage = (i) => {
        setNewBook({
            ...newBook,
            image: i
        })
    }

    const setAuthor = (i) => {
        setNewBook({
            ...newBook,
            author: i
        })
    }

    const setStock = (i) => {
        setNewBook({
            ...newBook,
            stock: i
        })
    }

    const handleClick = () => {
        setModalElement(<WarningModal toggleModal={setShowModal} setAction={postBook} modalText={"Boek Opslaan?"} />)
        setShowModal(true)
    }

    const postBook = () => {
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`
                },
                body: JSON.stringify(newBook)
            }

            fetch("http://localhost:8080/book/save", requestOptions)
            .then((r) => {
                r.json()
            })
            .then(d => {
                navigate("/")
            })
            // .then((d) => console.log("Success:", d))
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <div>
            {showModal && modalElement}
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-12">
                        <div className="d-flex justify-content-center ">
                            {buildImgElement()}
                        </div>
                    </div>
                    <div className="col-12 col-md-8 mt-3 mt-md-0">
                        <form>
                            <div className="form-group">
                                <label htmlFor="book-title">Boek Titel</label>
                                <input value={newBook.title} onChange={(e) => setTitle(e.target.value)} id="book-title" type="text" className="form-control" placeholder="Titel"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="book-title">Boek ISBN</label>
                                <input value={newBook.isbn} onChange={(e) => setIsbn(e.target.value)} id="book-ISBN" type="text" className="form-control" placeholder="ISBN nummer"></input>
                            </div>
                            <div>
                                <label htmlFor="book-author">Boek Auteur</label>
                                <input value={newBook.author} onChange={(e) => setAuthor(e.target.value)} id="book-author" type="text" className="form-control" placeholder="Auteur"></input>
                            </div>
                            <div>
                                <label htmlFor="book-title">Afbeelding URL</label>
                                <input value={newBook.image} onChange={(e) => setImage(e.target.value)} id="book-image" type="text" className="form-control" placeholder="Afbeelding URL"></input>
                            </div>
                            <div>
                                <label htmlFor="book-stock">Aantal</label>
                                <input value={newBook.stock} onChange={(e) => setStock(e.target.value)} id="book-stock" type="number" min="1" className="form-control" placeholder="Aantal exemplaren"></input>
                            </div>
                            <div className="mt-3 d-flex justify-content-center">
                                <Button onClick={handleClick} type="button" className="buttonGreen ml-0 mt-2" variant="success">Opslaan</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}