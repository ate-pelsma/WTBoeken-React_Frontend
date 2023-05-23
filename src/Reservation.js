import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import fetchTemplate from "./Services/FetchTemplate"
import { useLocalState } from "./utils/setLocalStorage"

export const Reservation = ({reservation}) => {

    const { id, reqDate, status, bookid, bookTitle, userid, userName } = reservation
    const [copysAvailable, setCopysAvailable] = useState([])
    const [jwt, setJwt] = useLocalState("", "jwt")
    const navigate = useNavigate()

    let fetchCopys = () => {
        fetchTemplate(`/book/${bookid}/copy/available`, "GET", jwt).then(r => setCopysAvailable(r))
    }

    useEffect(fetchCopys, [])

    return (
        <tr>
            <td><span className="pointer-hover" onClick={() => navigate(`/users/details/${userid}`)}>{userName}</span></td>
            <td><span className="pointer-hover" onClick={() => navigate(`/books/details/${bookid}`)}>{bookTitle}</span></td>
            <td>{reqDate}</td>
            <td>{copysAvailable.length}</td>
            <td>
                <svg 
                    onClick={() => navigate(`/reservations/${id}`)}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" height="16" 
                    fill="#00e600" 
                    className="bi bi-hand-index-fill pointer-hover" 
                    viewBox="0 0 16 16"
                >
                    <path d="M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v5.34l-1.2.24a1.5 1.5 0 0 0-1.196 1.636l.345 3.106a2.5 2.5 0 0 0 .405 1.11l1.433 2.15A1.5 1.5 0 0 0 6.035 16h6.385a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5.114 5.114 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.632 2.632 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046l-.048.002z"/>
                </svg>
            </td>
        </tr>
    )
}