import { useState, useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import axiosInstance from '../backend/axiosInstance.ts';
import './App.css'

import NavBar from './components/Navbar.tsx';

import Signup from './pages/Signup.tsx'
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

        }
        else {
          console.log("user not logged in");
          setLoggedIn(false);
        }
      })
      .catch(err => {
        console.log(err);

        setLoggedIn(false);
      })
  }, [loggedIn]);
  // console.log(loggedIn);
  if (loggedIn === null) {
    return <><p>Authenicating...</p></>
  }
  else if (loggedIn) {
    return <Outlet />
  } else {
    toast.error("You must log in first.", {id: 'no-auth-error'});
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
          <Route path="/signup" element={<><NavBar /><Signup /></>} />
          <Route path="/login" element={<><NavBar /><Login /></>} />
          <Route path="/test" element={<><Test /></>} />
          <Route element={<ProtectedRoute />} >
            <Route path="/hub" element={<><NavBar /><GameHub /></>} />
            <Route path="/lobby/:lobbyID" element={<Lobby />} />
            <Route path="/game/:lobbyID" element={<GameSession />} />
          </Route>
        </Routes>
      </Router>
      <Toaster 
      containerStyle={{
        top: 80
      }}

      toastOptions={{
        className: 'toast',
        style: {
          backgroundColor: 'var(--background)',
          border: '3px solid var(--accent)',
          boxShadow: '0px 2px 6px rgba(0,0,0,0.2)',
          color: 'var(--black)',
          borderRadius: '0',
          padding: '8px 16px',
        },
        success: {
          iconTheme: {
            primary: 'var(--accent)',
            secondary: 'var(--background)',
          },
        },
        error: {
          iconTheme: {
            primary: 'var(--accent)',
            secondary: 'var(--background)',
          },
        },
      }}/>
    </>
  )
}

export default App
