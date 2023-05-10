import React from "react";

export const BookClassForDashboard = ({book, handleCreateReservation}) => {

    const {id, image, title} = book
    const handleClick = () => {
        window.location.href = `/books/details/${id}` 
    }

    return (
        <div className="book-dashboard">
            <div classNAme="book-image-container">
                <img src={image} alt="None" onClick={handleClick} className="book-image-dashboard"></img>
            </div>
            <div className="book-details-container">
                {title}
            </div>
            <div className="book-button-container">
                <button onClick={() => handleCreateReservation(id)} className="buttonGrey"><p>Reserveer!</p></button>
            </div>
        </div>
    )
}