import React, { useState } from "react";

export const Book = ({book}) => {

    const {archived, id, image, isbn, reservations, stock, title} = book
    console.log(book)
    const subTitle = book.subtitle ? book.subtitle : ""
    return (
        <div className="container offset-md-1">
            <div>
                <img src={image}></img>
            </div>
            <div>
                {title}
                <p>{subTitle}</p>
            </div>
        </div>
    )

}