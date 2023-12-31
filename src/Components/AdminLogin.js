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
    <>
    <h2>Admin Login</h2>
    <div className="admin-login-container">
      <h2>Login</h2>
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
        <button className="login-button" type="button" onClick={handleLogin}>
          Login
        </button>
        {error && <p className="error">{error}</p>}
    </div>
    </>
  );
};

export default AdminLogin;