import React, { useState } from 'react';

const StudentLogin = ({ userCredentials }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check if the user credentials are defined
    if (userCredentials) {
      const foundUser = userCredentials.find(
        (user) => user.username === username && user.password === password
      );

      if (foundUser) {
        // Successfully logged in
        alert('Login successful');
      } else {
        // Invalid credentials
        alert('Invalid username or password');
      }
    } else {
      // Handle the case when userCredentials is undefined
      alert('User credentials are not available');
    }
  };

  return (
    <div>
      <h3>Student Login</h3>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default StudentLogin;
