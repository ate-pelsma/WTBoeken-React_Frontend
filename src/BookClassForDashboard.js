import React from "react";
import { useNavigate } from 'react-router-dom';

export const BookClassForDashboard = ({book, handleCreateReservation}) => {
    const navigate = useNavigate();

    const {id, image, title} = book
    const handleClick = () => {
        navigate(`/dashboard/books/details/${id}`)
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