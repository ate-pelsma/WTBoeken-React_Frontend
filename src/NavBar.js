import { useState } from "react";
import { BookView } from "./BookView";
import { UserView } from "./UserView";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
    
    // STAP 1 bepaal wie de user is: ADMIN OF USER
    // stap 2 genereer de jusite navbar items

    return (
        <div>
            {/* <button onClick={(e) => setBookView(prev => !prev)}>Book Overview</button> */}
            <NavLink to={"/books"}>Book Overview</NavLink>
            <NavLink to={"/users"}>User Overview</NavLink>
            {/* <button onClick={(e) => setUserView(prev => !prev)}>User Overview</button> */}
            {/* <BookCatalogus visible={bookView}/>
            <UserView visible={userView} /> */}
        </div>
    )
}
