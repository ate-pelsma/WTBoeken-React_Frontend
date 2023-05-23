import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { Register } from "./Register";
import NavBar from "./NavBar";
import { BookView } from "./BookView";
import { UserView } from "./UserView";
import { SearchIsbn } from "./SearchIsbn";
import { BookInfo } from "./BookInfo";
import PrivateRoute from "./PrivateRoute";
import { Dashboard } from "./Dashboard";
import { UserCreate } from "./UserCreate";
import { BookDetailsDashboard } from "./BookDetailsDashboard";
import { UserDetails } from "./UserDetails";
import { UserEdit } from "./UserEdit";
import { UserSelf } from "./UserSelf";
import { LoanByReservation } from "./LoanByReservation";
import { LoanByCopy } from "./LoanByCopy";
import { ReservationView } from "./ReservationView";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/books/details/:id"
            element={
              <PrivateRoute>
                <BookDetailsDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PrivateRoute>
                <Register />
              </PrivateRoute>
            }
          />
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <BookView />
              </PrivateRoute>
            }
          />
          <Route
            path="/books/create"
            element={
              <PrivateRoute>
                <SearchIsbn />
              </PrivateRoute>
            }
          />
          <Route
            path="/books/details/:id"
            element={
              <PrivateRoute>
                <BookInfo />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <UserView />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/create"
            element={
              <PrivateRoute>
                <UserCreate />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/details/:id"
            element={
              <PrivateRoute>
                <UserDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/self"
            element={
              <PrivateRoute>
                <UserSelf />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/edit/:id"
            element={
              <PrivateRoute>
                <UserEdit />
                </PrivateRoute>
                 } />
              <Route path="/reservations" element={
                <PrivateRoute>
                <ReservationView />
              </PrivateRoute>
            }
          />
          <Route
            path="/reservations/:id"
            element={
              <PrivateRoute>
                <LoanByReservation />
              </PrivateRoute>
            }
          />
          <Route
            path="/copies/:id"
            element={
              <PrivateRoute>
                <LoanByCopy />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
