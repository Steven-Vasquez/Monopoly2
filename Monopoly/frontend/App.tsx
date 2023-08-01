import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

import Register from './pages/register.tsx'
import Login from './pages/login.tsx'
import Home from './pages/home.tsx';
import Lobby from './pages/lobby.tsx';

import axios from 'axios';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  axios.defaults.withCredentials = true; // Allow cookies to be stored in the browser

  useEffect(() => {

    axios.get("http://localhost:3001/checkLogin")
      .then(res => {

        if (res.data.loggedIn === true) {
          setLoggedIn(true);
          setUsername(res.data.user.username);
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


  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  
  if(username !== "") {
    console.log("The username in App.js is: ");
    console.log(username);
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
          {loggedIn ? (
            <>
              <Route path="/lobby" element={<Lobby />} />
            </>
          ) : null}
        </Routes>
      </Router>
    </>
  )
}

export default App
