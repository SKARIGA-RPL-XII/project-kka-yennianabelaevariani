import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HealthMate from'./landingpage'
import "./index.css";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HealthMate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
