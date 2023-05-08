import React from "react";
import { useLocalState } from "./utils/setLocalStorage";

export const Reservation = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    function createReservation(){
        fetch("http://localhost:8080/reservations/save", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "POST",
        })
        .then((response) => {
            console.log(response);
            if(response.status === 200) return response.json();
        })
        .then((data) => {
            console.log(data)
        });
    }
    return (
        <div>
            <button onClick={() => createReservation()}>Reserveer!</button>
        </div>
    )
}