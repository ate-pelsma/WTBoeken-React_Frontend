import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import { Register } from "./Register";
import NavBar from './NavBar';
import { BookView } from './BookView';
import { UserView } from './UserView';
import { SearchIsbn } from './SearchIsbn';
import { BookDetails } from './BookDetails';
import  PrivateRoute from './PrivateRoute';
import { Reservation } from './Reservation';

function App() {

  return (
    <div className="App">
        <Router>
          <NavBar />
          <Routes>
              <Route path="/" element={<Reservation />} />
              <Route path="/login" element={<Login />} />
              
              <Route path="/register" element={
                <PrivateRoute>
                <Register />
                </PrivateRoute>
                 } />
              <Route path="/books" element={
                <PrivateRoute>
                <BookView />
                </PrivateRoute>
                 } />
              <Route path="/books/create" element={
                <PrivateRoute>
                <SearchIsbn />
                </PrivateRoute>
                 } />
              <Route path='/books/details/:id' element={
                <PrivateRoute>
                <BookDetails />
                </PrivateRoute>
                 } />
              <Route path="/users" element={
                <PrivateRoute>
                <UserView />
                </PrivateRoute>
                 } />
              <Route path="/reservations" element={
                <PrivateRoute>
                <Reservation />
                </PrivateRoute>
                 } />
              {/* <Route path="/reservations" element={<Reservations />} /> */}
          </Routes>
        </Router>
    </div>
  );
}
export default App;