import { useState } from "react";
import Button from "react-bootstrap/Button";

import 'bootstrap/dist/css/bootstrap.min.css';

export const CreateBook = ({fetchBooks}) => {

    const emptyBook = {
        title: "",
        ISBN: "",
        image: ""
    }

    const [newBook, setNewBook] = useState(emptyBook)

    const setTitle = (i) => {
        setNewBook({
            ...newBook,
            title: i
        })
    }

    const setISBN = (i) => {
        setNewBook({
            ...newBook,
            ISBN: i
        })
    }

    const setImage = (i) => {
        setNewBook({
            ...newBook,
            image: i
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newBook)
            }

            fetch("http://localhost:8080/book/save", requestOptions)
            .then((r) => {
                console.log(r)
                r.json()})
            .then(d => {
                console.log(d)
                setNewBook(emptyBook)
                fetchBooks()
            })
            // .then((d) => console.log("Success:", d))
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="book-title">Book Title</label>
                    <input value={newBook.title} onChange={(e) => setTitle(e.target.value)} id="book-title" type="text" className="form-control" placeholder="Book Title"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="book-title">Book ISBN</label>
                    <input value={newBook.ISBN} onChange={(e) => setISBN(e.target.value)} id="book-ISBN" type="text" className="form-control" placeholder="ISBN number"></input>
                </div>
                <div>
                    <label htmlFor="book-title">Image URL</label>
                    <input value={newBook.image} onChange={(e) => setImage(e.target.value)} id="book-image" type="text" className="form-control" placeholder="Book image URL"></input>
                </div>
                <Button type="submit" className="mt-2" variant="success">Register</Button>
            </form>
        </div>
    )
}