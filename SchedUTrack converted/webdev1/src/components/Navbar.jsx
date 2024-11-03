// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar({ onSidebarToggle, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="navbar">
      <button className="sidebar-toggle" onClick={onSidebarToggle}>
        <i className="fas fa-bars"></i> Menu
      </button>
      <h1 className="navbar-title">SchedUTrack</h1>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
