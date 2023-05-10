import React from "react";

export const BookClassForDashboard = ({book, handleCreateReservation}) => {

    const {id, image, title} = book
    const handleClick = () => {
        window.location.href = `/dashboard/books/details/${id}` 
    }

    return (
        <div className="dashboard-book-container">
            <div>
                <img src={image} alt="None" onClick={handleClick} className="dashboard-image"></img>
            </div>
            <div className="dashboard-title">
                {title}
            </div>
            <div>
                <button onClick={() => handleCreateReservation(id)} className="buttonGrey"><p>Reserveer!</p></button>
            </div>
        </div>

    )
}