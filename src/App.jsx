import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Swaps from "./components/pages/Swaps";
import Admin from "./components/pages/Admin";
import Navbar from "./components/Navbar";
import Login from "./components/pages/Login";
import ViewProfile from "./components/ViewProfile";



export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/swaps" element={<Swaps />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
<Route path="/user/:name" element={<ViewProfile />} />


      </Routes>
    </BrowserRouter>
    
  );
}
