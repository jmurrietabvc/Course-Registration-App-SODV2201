import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/StudentLogin.css"; // Import the CSS file

const Studentlogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // Make an HTTP POST request to authenticate the user
      const response = await axios.post("http://localhost:5544/login", {
        username,
        password,
      });

      // Check if the authentication was successful
      if (response.data.success) {
        // Successful login, pass the student data as props
        navigate("/student/dashboard", {
          state: { student: response.data.student },
        });
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <>
      <h2>Student Portal</h2>
      <div className="student-login-container">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-button" type="button" onClick={handleLogin}>
            Log In
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          Don't have an account?{" "}
          <Link to="/student/registration" className="sign-up-link">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
};

export default Studentlogin;
