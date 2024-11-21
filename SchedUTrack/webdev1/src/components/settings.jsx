import React, { useState, useEffect } from 'react';
import '../styles/settings.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/settings/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUsername(data.username);
        setEmail(data.email);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        toast.error('Failed to load user data', { autoClose: 2000 });
      }
    };
    fetchUserData();
  }, []);

  const handleChangeClick = () => {
    setIsEditable(true);
    setUsername(''); // Clear the fields for new input
    setEmail('');
  };

  const handleUpdate = async () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address', { autoClose: 2000 });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/settings/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ newUsername: username, email }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      toast.success('User details updated successfully', { autoClose: 2000 });

      // Log the user out after update
      setTimeout(() => {
        localStorage.removeItem('token'); // Remove the token
        navigate('/login'); // Redirect to login page
      }, 2000);
    } catch (error) {
      console.error('Error updating user details:', error);
      toast.error('Failed to update user details', { autoClose: 2000 });
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-modal">
        <h2 className="settings-title">User Settings</h2>
        <div className="settings-field">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            readOnly={!isEditable}
            onChange={(e) => setUsername(e.target.value)}
            className={!isEditable ? 'read-only' : ''}
          />
        </div>
        <div className="settings-field">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            readOnly={!isEditable}
            onChange={(e) => setEmail(e.target.value)}
            className={!isEditable ? 'read-only' : ''}
          />
        </div>
        <div className="settings-buttons">
          {isEditable ? (
            <button className="change-button" onClick={handleUpdate}>
              Confirm
            </button>
          ) : (
            <button className="change-button" onClick={handleChangeClick}>
              Change
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Settings;
