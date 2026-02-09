import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HealthMate from'./landingpage'
import Login from "./auth/login";
import Register from "./auth/register";
import Dashboard from './dashboardu';
import DashboardA from "./dashboarda";
import Chatbot from "./chatbot";
import Riwayat from "./riwayat";
import Sreening from "./ScreeningPage";
import Sreeningawal from "./skriningawal";
import User from "./ManajemenUser";
import Pertanyaanskrining from "./pertanyaanskrining";
import Kategory from "./kategory";
import Profile from "./profile";
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
        <Route path="/r" element={<Riwayat />} />
        <Route path="/skrining" element={<Sreening />} />
        <Route path="/skriningawal" element={<Sreeningawal />} />
        <Route path="/dasboard" element={<DashboardA />} />
        <Route path="/user" element={<User />} />
        <Route path="/Pertanyaanskrining" element={<Pertanyaanskrining />} />
        <Route path="/kategori" element={<Kategory />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
