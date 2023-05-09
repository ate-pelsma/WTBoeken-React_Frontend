import React from "react";
import { Navigate } from "react-router-dom";

export const User = ({user}) => {

    const {id, name, email, permissions} = user
    const handleClick = () => {
        <Navigate to={`/user/details/${id}`}/>
    }
    
    const role = (user.permissions === "ROLE_ADMIN") ? "Admin" : "User"

    return (
        <tr onClick={handleClick}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td>BEWERKEN PLACEHOLDER</td>
            <td>DEACTIVEREN PLACEHOLDER</td>
        </tr>
    )
}