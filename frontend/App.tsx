import { useState, useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import axiosInstance from '../backend/axiosInstance.ts';
import './App.css'

import NavBar from './components/Navbar.tsx';

import Register from './pages/Signup.tsx'
import Login from './pages/Login.tsx'
import Home from './pages/Home.tsx';
import Lobby from './pages/Lobby.tsx';
import GameHub from './pages/GameHub.tsx';
import GameSession from './pages/GameSession.tsx';
import Test from './pages/BoardTest.tsx';

import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';


function ProtectedRoute(): JSX.Element {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);  
  useEffect(() => {
    axiosInstance.get("/checkLogin")
      .then(res => {
        console.log("logged in status is " + res.data.loggedIn);

        if (res.data.loggedIn === true) {
          setLoggedIn(true);
          // setUsername(res.data.user.username);
          // authenticated = true;
          
        }
        else {
          // setLoggedIn(false);
          console.log("user not logged in");
          toast.error("You must log in first.");
          setLoggedIn(false);
        }
      })
      .catch(err => {
        console.log(err);
        toast.error(`Error logging in. ${err}`);
        setLoggedIn(false);
      })
  }, [loggedIn]);
  // console.log(loggedIn);
  if (loggedIn === null) {
    return <><h1>Loading...</h1></>
  }
  else if (loggedIn) {
    toast.success("User is authenticated");
    return <Outlet />
  } else {
    toast.error("You must log in first.");
    return <Navigate to="/login" replace></Navigate>
  }
}

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<><NavBar /><Navigate to="/" /></>} />
          <Route index path="/" element={<><NavBar /><Home /></>} />
          <Route path="/signup" element={<><NavBar /><Register /></>} />
          <Route path="/login" element={<><NavBar /><Login /></>} />
          <Route path="/test" element={<><Test /></>} />
          <Route element={<ProtectedRoute />} >
            <Route path="/hub" element={<><NavBar /><GameHub /></>} />
            <Route path="/lobby/:lobbyID" element={<Lobby />} />
            <Route path="/game/:lobbyID" element={<GameSession />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </>
  )
}

export default App
