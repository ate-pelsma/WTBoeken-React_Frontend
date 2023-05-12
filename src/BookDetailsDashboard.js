import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useLocalState } from "./utils/setLocalStorage";


export const BookDetailsDashboard = () => { 
    const { id } = useParams()
    const [bookDetails, setBookDetails] = useState([])
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [copyDetails, setCopyDetails] = useState([])
    const [copysAvailable, setCopysAvailable] = useState(0)
    const [copysAvailablePercentage, setCopysAvailablePercentage] = useState(0)
    const navigate = useNavigate();
    
    function createReservation(bookId){
        fetch("http://localhost:8080/reservations/save", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "POST",
            body: JSON.stringify(bookId)
        })
        .then((response) => {
            console.log(response);
            if(response.status === 200) return response.json();
        })
        .then((data) => {
            console.log(data)
        });
    }

    let fetchBook = () => {
        fetch(`http://localhost:8080/book/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setBookDetails(data)
        })
    }

    let fetchCopies = () => {
        fetch(`http://localhost:8080/book/${id}/copy/all`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setCopyDetails(data)
        })
    }

    useEffect(() => {
        fetchBook()
        fetchCopies()
    }, [])

    useEffect(() => {
        let count = 0;
        for(let i = 0; i < copyDetails.length; i++){
            if(!copyDetails[i].loaned){
                count++
            }
        }
        setCopysAvailable(count);
        setCopysAvailablePercentage(count / copyDetails.length * 100)
        console.log(copysAvailablePercentage);
    }, [copyDetails]);

    const handleGoBack = () => {
        navigate(-1);
    }

    return(
        <div className="book-container">
            <div className="book-details-container">
                <div className="book-image-container">
                     <img src={bookDetails.image} alt="None" className="book-image"></img>
                </div>
                <div className="book-info-container">
                    <h1>{bookDetails.title}</h1>
                    <h2>Autheur:</h2>
                    <span>{bookDetails.author}</span>
                    <h2>ISBN:</h2>
                    <span>{bookDetails.isbn}</span>
                    <h2>Beschikbaar:</h2>
                    <div className="meter">
                        <span style={{width: `${copysAvailablePercentage}%`,
                                    backgroundColor: copysAvailable > 1 || copysAvailable === 1 && copyDetails.length === 1 ? 'rgb(43,194,83)' : 
                                                     copysAvailable > 0 ? 'orange' : 'red'}}>
                        </span>
                        <span className="available">{copysAvailable}/{copyDetails.length}</span>
                    </div>
                    <button onClick={() => createReservation(id)} className="buttonBlack"><h2>Reserveer!</h2></button>
                </div>
                <div>
                <img
                    src={require("./images/Go-back-icon.png")}
                    alt="Workingtalent Logo"
                    className="back-arrow"
                    onClick={handleGoBack}
                />
                </div>
            </div>

        </div>
    )
}