import React from "react";
import "../styles/sidebar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faHome,
  faUserCheck,
  faCalendarAlt,
  faChartBar,
  faPlusCircle,
  faInfoCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar({ isOpen, onSidebarClose }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={onSidebarClose}>
        <i className="fas fa-times"></i>
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={onSidebarClose}>
              <FontAwesomeIcon icon={faHome} className="icon" /> Homepage
            </Link>
          </li>
          <li>
            <Link to="/tasks" onClick={onSidebarClose}>
              <FontAwesomeIcon icon={faTasks} className="icon" /> Tasks
            </Link>
          </li>
          <li>
            <Link to="/attendance" onClick={onSidebarClose}>
              <FontAwesomeIcon icon={faUserCheck} className="icon" /> Attendance
            </Link>
          </li>
          <li>
            <Link to="/schedule" onClick={onSidebarClose}>
              <FontAwesomeIcon icon={faCalendarAlt} className="icon" /> Schedule
            </Link>
          </li>
          <li>
            <Link to="/grades" onClick={onSidebarClose}>
              <FontAwesomeIcon icon={faChartBar} className="icon" /> Grades
            </Link>
          </li>
          <li>
            <Link to="/add-task" onClick={onSidebarClose}>
              <FontAwesomeIcon icon={faPlusCircle} className="icon" /> Add Task
            </Link>
          </li>
          <li>
            <Link to="/about-us" onClick={onSidebarClose}>
              <FontAwesomeIcon icon={faInfoCircle} className="icon" /> About Us
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={onSidebarClose}>
              <FontAwesomeIcon icon={faCog} className="icon" /> Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
