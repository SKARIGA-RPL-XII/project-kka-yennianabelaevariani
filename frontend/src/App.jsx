import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HealthMate from'./landingpage'
import Login from "./auth/login";
import Register from "./auth/register";
import "./index.css";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HealthMate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regis" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
