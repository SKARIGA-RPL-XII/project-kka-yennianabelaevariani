import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HealthMate from'./landingpage'
import Login from "./auth/login";
import Register from "./auth/register";
import Dashboard from './dashboardu';
import Chatbot from "./chatbot";
import "./index.css";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HealthMate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regis" element={<Register />} />
        <Route path="/d" element={<Dashboard />} />
        <Route path="/c" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
