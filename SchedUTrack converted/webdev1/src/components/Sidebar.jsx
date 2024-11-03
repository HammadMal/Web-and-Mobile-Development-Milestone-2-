// src/components/Sidebar.jsx
import React from 'react';
import '../styles/sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, onSidebarClose }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onSidebarClose}>
        <i className="fas fa-times"></i>
      </button>
      <nav>
        <ul>
          <li><Link to="/" onClick={onSidebarClose}>Home</Link></li>
          <li><Link to="/tasks" onClick={onSidebarClose}>Tasks</Link></li>
          <li><Link to="/attendance" onClick={onSidebarClose}>Attendance</Link></li>
          <li><Link to="/schedule" onClick={onSidebarClose}>Schedule</Link></li>
          <li><Link to="/grades" onClick={onSidebarClose}>Grades</Link></li>
          <li><Link to="/add-task" onClick={onSidebarClose}>Add Task</Link></li>
          <li><Link to="/about-us" onClick={onSidebarClose}>About Us</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
