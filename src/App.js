import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import { Register } from "./Register";
import NavBar from './NavBar';
import { BookView } from './BookView';
import { UserView } from './UserView';
import { SearchIsbn } from './SearchIsbn';
import { BookDetails } from './BookDetails';

function App() {

  return (
    <div className="App">
        <Router>
          <NavBar />
          <Routes>
              <Route path="/" element={<BookView />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/books" element={<BookView />} />
              <Route path="/books/create" element={<SearchIsbn />} />
              <Route path='/books/details/:id' element={<BookDetails />} />
              <Route path="/users" element={<UserView />} />
              {/* <Route path="/reservations" element={<Reservations />} /> */}
          </Routes>
        </Router>
    </div>
  );
}

export default App;
