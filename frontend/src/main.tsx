import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Challenge from "./components/Challenge.tsx";
import Marketplace from "./components/Marketplace.tsx";
import Navbar from "./components/Navbar.tsx";
import Login from "./components/Login.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
