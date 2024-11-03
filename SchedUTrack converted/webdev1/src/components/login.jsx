// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function Login({ onLogin }) {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateLogin = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple authentication check
    if (username === 'user' && password === 'password') {
      setErrorMessage('');
      onLogin(); // Call the login handler to update `isLoggedIn` in App.jsx
      navigate('/'); // Redirect to homepage
    } else {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-page">
      {/* Logo section (optional) */}
      <div className="logo-container">
        <img src="public/logo.png" alt="SchedUTrack Logo" className="login-logo" />
      </div>

      {/* Login Form */}
      <div className="login-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Login</h2>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <div className="input-group">
            <button type="button" onClick={validateLogin}>Login</button>
            <div className="forgot-password-container">
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
