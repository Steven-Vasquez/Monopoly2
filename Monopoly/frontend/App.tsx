//import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import useAuth from './useAuth.tsx';
import Register from './pages/register.tsx'
import Login from './pages/login.tsx'
import Home from './pages/home.tsx';
import Lobby from './pages/lobby.tsx';

function App() {
  const { authenticated } = useAuth();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {authenticated ? (
            <>
              <Route path="/lobby" element={<Lobby />} />
            </>
          ) : null}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
