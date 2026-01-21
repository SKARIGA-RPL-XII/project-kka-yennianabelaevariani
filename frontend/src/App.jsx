import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './landingpage'
import "./index.css";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
