import React, { useState } from "react";

export const Book = ({book}) => {

    const {id, author, image, isbn, tags, stock, title} = book

    const handleClick = () => {
        window.location.href = `/books/details/${id}`
    }

    return (
        <tr onClick={handleClick}>
            <td><img src={image} style={{width: "50px"}}></img></td>
            <td>{title}</td>
            <td>{author}</td>
            <td>{isbn}</td>
            <td>{stock}</td>
            <td>{tags}</td>
        </tr>
    )

}