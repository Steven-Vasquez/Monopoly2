import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Register from './pages/register.tsx'
import Login from './pages/login.tsx'
import Home from './pages/home.tsx';
import Lobby from './pages/lobby.tsx';

import axios from 'axios';

function App() {
  axios.defaults.withCredentials = true; // Allow cookies to be stored in the browser

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  //const [username, setUsername] = useState("");

  useEffect(() => {
    axios.post("http://localhost:3001/checkLogin")
      .then(res => {
        console.log("The response from the login get in App.js is: is: ");
        console.log(res.data.user);
        console.log(res.data);
        if (res.data.loggedIn === true) {
          setLoggedIn(true);
          //setUsername(res.data.user.username);
        } else {
          setLoggedIn(false);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  console.log("The loggedIn variable in App.ts is: ");
  console.log(loggedIn);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {loggedIn ? (
            <>
              <Route path="/lobby" element={<Lobby />} />
            </>
          ) : null}
          {!loggedIn ? (
            <Route path="*" element={<Navigate to="/" />} />
          ) : null}
        </Routes>
      </Router>
    </>
  )
}

export default App
