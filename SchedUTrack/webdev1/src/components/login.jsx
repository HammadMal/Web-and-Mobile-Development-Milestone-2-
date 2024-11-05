import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function Login({ onLogin }) {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateLogin = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        setErrorMessage('');
        onLogin();
        navigate('/');
      } else {
        setErrorMessage(data.msg || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        <img src="public/logo.png" alt="SchedUTrack Logo" className="login-logo" />
      </div>

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
          </div>
          {errorMessage && (
            <div className="error-message visible">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
