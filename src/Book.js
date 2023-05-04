import React, { useState } from "react";

export const Book = ({book}) => {

    const {archived, id, image, isbn, reservations, stock, title} = book
    return (
        <div>
            <h1>{title}</h1>
            <h3>{isbn}</h3>
        </div>
    )

}