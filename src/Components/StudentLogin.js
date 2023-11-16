import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/StudentLogin.css"; // Import the CSS file

const Studentlogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Add the following lines to retrieve and log student data from localStorage
  const students = JSON.parse(localStorage.getItem("students")) || [];
  console.log("Students data retrieved from localStorage:", students);

  const handleLogin = () => {
    // Add the following lines to find and log the user during login
    const user = students.find(
      (student) =>
        student.username === username && student.password === password
    );
    console.log("User found during login:", user);

    if (user) {
      // Successful login, pass the student data as props
      navigate("/student/dashboard", { state: { student: user } });
    } else {
      setError("Invalid username or password. Please try again.");
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
