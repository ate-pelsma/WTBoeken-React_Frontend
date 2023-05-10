import React from "react";
import { Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

export const User = ({user}) => {

    const {id, name, username, permissions} = user
    const handleClick = () => {
        <Navigate to={`/user/details/${id}`}/>
    }
    
    const role = (user.permissions === "ROLE_ADMIN") ? "Admin" : "User"

    return (
        <tr onClick={handleClick}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{username}</td>
            <td>{role}</td>
            <td>
                <Link to={`/users/edit/${id}`}>
                    <Button variant="link" className="p-0">
                        <i className="bi bi-gear-fill"></i>
                    </Button>
                </Link>
            </td>
            <td>DEACTIVEREN PLACEHOLDER</td>
        </tr>
    )
}