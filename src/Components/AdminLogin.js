// AdminLoginPage.js Component
import React, { useState } from 'react';

const AdminLogin = ({ onAdminLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError(''); // Reset any previous errors

    // Simulate a simple login with hardcoded credentials (not secure for production)
    if (username === 'admin' && password === 'admin') {
      // Successful login
      onAdminLogin(); // Call the provided callback to indicate a successful login
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h3>Admin Login</h3>
      <div>
        <label>Username:</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AdminLogin;
