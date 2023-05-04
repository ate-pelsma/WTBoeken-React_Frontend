import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import 'bootstrap/dist/css/bootstrap.min.css';

export const CreateBook = ({data, isbn, alert}) => {

    const emptyBook = {
        title: "",
        isbn: "",
        image: "",
        author: ""
    }

    const [newBook, setNewBook] = useState(emptyBook)

    useEffect(() => {
        if(data){
            setNewBook({
                title: data.title,
                isbn: isbn,
                image: data.cover.medium,
                author: showAuthors()
            })
        } 
        if(alert === true){
            setNewBook(emptyBook)
        }
    }, [data, alert])

    const showAuthors = () => {
        let authorString = data.authors[0].name
        for(let i = 1; i < data.authors.length; i++){
            authorString += ", " + data.authors[i].name
        }
        return authorString
    }

    const imageElement = data ? <img src={data.cover.medium}></img> : null

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

    const handleSubmit = (e) => {
        console.log(newBook)
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
                setNewBook(emptyBook)
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
                    <input value={newBook.isbn} onChange={(e) => setIsbn(e.target.value)} id="book-ISBN" type="text" className="form-control" placeholder="ISBN number"></input>
                </div>
                <div>
                    <label htmlFor="book-author">Book Author</label>
                    <input value={newBook.author} onChange={(e) => setAuthor(e.target.value)} id="book-author" type="text" className="form-control" placeholder="Book image URL"></input>
                </div>
                <div>
                    <label htmlFor="book-title">Image URL</label>
                    <input value={newBook.image} onChange={(e) => setImage(e.target.value)} id="book-image" type="text" className="form-control" placeholder="Book image URL"></input>
                </div>
                <Button type="submit" className="mt-2" variant="success">Save Book</Button>
            </form>
            {imageElement}
        </div>
    )
}