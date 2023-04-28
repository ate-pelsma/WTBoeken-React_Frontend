import React, {useContext, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from "./Login";
import { Register } from "./Register";
import { Dashboard } from './Dashboard';

export const AppContext = React.createContext()

function App() {

  const [authenticated, setAuthenticated] = useState(true)
  return (
    <div className="App">
      <AppContext.Provider value={ { authenticated, setAuthenticated } }>
        <Router>
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
