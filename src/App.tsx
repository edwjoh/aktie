import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import StockPage from "./StockPage";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stock/:ticker" element={<StockPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
