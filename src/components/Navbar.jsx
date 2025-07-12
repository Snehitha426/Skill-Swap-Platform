// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // add this line to import CSS

export default function Navbar() {
  const user = localStorage.getItem("user");

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/swaps">Swaps</Link>
      <Link to="/admin">Admin</Link>

      {/* Login / Logout */}
      {!user ? (
        <Link to="/login" className="nav-button">Login</Link>
      ) : (
        <button
          className="nav-button logout"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.reload();
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
}
