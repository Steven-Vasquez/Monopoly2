import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

import NavBar from './components/Navbar.tsx';

import Register from './pages/Signup.tsx'
import Login from './pages/Login.tsx'
import Home from './pages/Home.tsx';
import Lobby from './pages/Lobby.tsx';
import GameHub from './pages/GameHub.tsx';

import axiosInstance from '../backend/axiosInstance.ts';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {

    axiosInstance.get("/checkLogin")
      .then(res => {
        console.log("logged in status is " + res.data.loggedIn);

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
        <NavBar loggedIn={loggedIn} />
        <Routes>
        <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Home loggedIn={loggedIn}/>} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {loggedIn ? (
            <>
              <Route path="/hub" element={<GameHub />} />
              <Route path="/lobby/:lobbyID" element={<Lobby />} />
            </>
          ) : null}
        </Routes>
      </Router>
    </>
  )
}

export default App
