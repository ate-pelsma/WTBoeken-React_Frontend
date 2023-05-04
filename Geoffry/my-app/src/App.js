import React from 'react';
import Nav from "./components/Nav";
import MakeAccount from './components/MakeAccount';
import {Route, Routes} from "react-router-dom"
import Login from './components/LoginPage';

export default function App(){
  fetch("/")
  
  return(
    <>
    <Nav />
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/MakeAccount" element={<MakeAccount />}></Route>
      </Routes>
    </div>
    </>
  )
}
