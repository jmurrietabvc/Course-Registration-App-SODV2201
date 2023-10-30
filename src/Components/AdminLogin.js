// AdminLogin.js Component
import React, { useState } from 'react';
import '../css/adminStyle.css'; // Import the CSS file

const AdminLogin = ({ onAdminLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Add state for password
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError(''); // Reset any previous errors

    // Simulate a simple login with hardcoded credentials (not secure for production)
    if (username === 'admin' && password === 'admin') {
      onAdminLogin(); // Call the provided callback to indicate a successful login
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-login-container">
      <h3>Admin Login</h3>
      <div className="admin-login-form">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="admin-login-button" onClick={handleLogin}>
          Login
        </button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;