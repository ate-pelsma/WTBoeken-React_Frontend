import React, { useState } from "react";

export const Book = (props) => {

    const {archived, id, image, isbn, reservations, stock, title} = props.book
    reservations.map(r => console.log(r))
    return (
        <div>
            <h1>{title}</h1>
            <h3>{isbn}</h3>
        </div>
    )

}