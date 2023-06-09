//import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Test from './pages/test.tsx'

function App() {
  //const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Test />}  />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
