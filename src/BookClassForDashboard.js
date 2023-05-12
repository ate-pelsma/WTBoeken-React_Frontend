import React from "react";
import { useNavigate } from 'react-router-dom';

export const BookClassForDashboard = ({book, handleCreateReservation}) => {
    const navigate = useNavigate();

    const {id, image, title} = book
    const handleClick = () => {
        navigate(`/dashboard/books/details/${id}`)
    }

    return (
        <div className="col-12 col-md-3 align-items-center" >
            <div className="dashboard-book-container d-flex flex-column justify-content-center align-items-center">
                <img src={image} alt="None" onClick={handleClick} className="dashboard-image"></img>
                <div className="dashboard-title">
                    <p>{title}</p>
                </div>
                <button onClick={() => handleCreateReservation(book)} className="buttonGrey"><p>Reserveer!</p></button>
            </div>
        </div>

    )
}