import React from "react";
import "../styles/notification.css";// Import styles specific to the component


function Notification({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
    </div>
  );
}

export default Notification;
