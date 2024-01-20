import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Challenge from "./components/Challenge.tsx";
import Marketplace from "./components/Marketplace.tsx";
import Navbar from "./components/Navbar.tsx";
import Profile from "./components/Profile.tsx";
import Login from "./components/Login.tsx";
import { Toaster } from "sonner";
import Question from "./components/Question.tsx";
import Leaderboard from "./components/Leaderboard.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/challenge/:id" element={<Question />} />
        <Route path="/challenge/:id/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  </React.StrictMode>
);
