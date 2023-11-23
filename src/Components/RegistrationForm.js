import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/StudentForm.css"; // Import the CSS file
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [program, setProgram] = useState("Diploma");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      // Create a student object
      const student = {
        //id: studentId,
        firstName,
        lastName,
        email,
        phone,
        dob,
        //department: "SD Department",
        program,
        username,
        password,
      };

      // Make an HTTP POST request to the server to register the student
      await axios.post("http://localhost:5544/register", student);

      navigate("/student/login");
    } catch (error) {
      console.error("Error registering student:", error);
      // Handle error appropriately (e.g., display an error message to the user)
    }
  };

  return (
    <>
      <h2> Registration</h2>
      <div className="form-container">
        <h2>Signup</h2>
        <form>
          <div className="form-group">
            <label>First Name:</label>
            <div className="form-input-container">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <div className="form-input-container">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Email:</label>
            <div className="form-input-container">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <div className="form-input-container">
              <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <div className="form-input-container">
              <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Program:</label>
            <div className="form-input-container">
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="form-input"
              >
                <option value="Diploma">Diploma</option>
                <option value="Post Diploma">Post Diploma</option>
                <option value="Certificate">Certificate</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Username:</label>
            <div className="form-input-container">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <div className="form-input-container">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleSignup}
            className="register-button"
          >
            Signup
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
