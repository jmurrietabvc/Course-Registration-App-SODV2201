import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/StudentForm.css"; // Import the CSS file
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [student_firstName, setFirstName] = useState("");
  const [student_lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [programs, setPrograms] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [selectedProgram, setSelectedProgram] = useState({
    program_id: "", // Initialize program_id as an empty string
    program_name: "",
  });

  useEffect(() => {
    // Fetch program names when the component mounts
    const fetchPrograms = async () => {
      try {
        const response = await axios.get("http://localhost:5544/programs");
        console.log("Programs response:", response.data);
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  const handleSignup = async () => {
    try {
      // Ensure a program is selected before proceeding
      if (!selectedProgram.program_id) {
        console.error("No program selected");
        // Handle the error appropriately
        return;
      }

      // Create a student object
      const student = {
        student_firstName,
        student_lastName,
        email,
        phone,
        dob,
        program_name: selectedProgram.program_name,
        program_id: selectedProgram.program_id,
        username,
        password,
      };

       // Assign the 'department' value based on the selected program's name
    if (selectedProgram.program_name === 'Diploma') {
      student.department = 'Diploma';
    } else if (selectedProgram.program_name === 'Post-Diploma') {
      student.department = 'Post-Diploma';
    } else if (selectedProgram.program_name === 'Certificate') {
      student.department = 'Certificate';
    } else {
      console.error("Invalid program name");
      // Handle the error appropriately
      return;
    }

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
                value={student_firstName}
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
                value={student_lastName}
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
                value={selectedProgram.program_id}
                onChange={(e) =>
                  setSelectedProgram({
                    program_id: e.target.value,
                    program_name: e.target.options[e.target.selectedIndex].text,
                  })
                }
                className="form-input"
              >
                <option value="" disabled>
                  Select a program
                </option>
                {Array.isArray(programs) &&
                  programs.map((program) => (
                    <option key={program.program_id} value={program.program_id}>
                      {program.program_name}
                    </option>
                  ))}
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
