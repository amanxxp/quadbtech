import React from 'react'
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import HomePage from './pages/HomePage';


const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/" element={<HomePage />} />
      </Routes>
  )
}

export default App