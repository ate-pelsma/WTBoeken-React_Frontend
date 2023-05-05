import React from "react";

export const Book = ({book}) => {

    const {id, author, image, isbn, tags, title, copies} = book
    const handleClick = () => {
        window.location.href = `/books/details/${id}`
    }

    return (
        <tr onClick={handleClick}>
            <td><img src={image} alt="None" style={{width: "50px"}}></img></td>
            <td>{title}</td>
            <td>{author}</td>
            <td>{isbn}</td>
            <td>{copies.length}</td>
            <td>{tags}</td>
        </tr>
    )

}