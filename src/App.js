import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import { Register } from "./Register";
import NavBar from './NavBar';
import { BookView } from './BookView';
import { UserView } from './UserView';
import { SearchIsbn } from './SearchIsbn';
import { BookInfo } from './BookInfo';
import  PrivateRoute from './PrivateRoute';
import { Dashboard } from './Dashboard';

function App() {

  return (
    <div className="App">
        <Router>
          <NavBar />
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <PrivateRoute>
                <Dashboard />
                </PrivateRoute>
                 } />
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
                <BookInfo />
                </PrivateRoute>
                 } />
              <Route path="/users" element={
                <PrivateRoute>
                <UserView />
                </PrivateRoute>
                 } />
          </Routes>
        </Router>
    </div>
  );
}
export default App;