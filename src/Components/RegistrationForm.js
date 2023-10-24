import React, { useState } from 'react';
import '../css/StudentForm.css';

const generateRandomStudentID = () => {
  // Generate a random 6-digit student ID
  return Math.floor(100000 + Math.random() * 900000);
};

const StudentRegistrationForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    studentID: generateRandomStudentID(),
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    department: 'SD department',
    program: '',
    username: '',
    password: '',
  });

  const handleRegistration = () => {
    // Implement registration logic here
    // You can add validation and make API requests to register the student

    // Create a new student object based on the form data
    const newStudent = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      department: formData.department,
      program: formData.program,
      username: formData.username,
      password: formData.password,
      // Generate a random 6-digit student ID
      studentId: Math.floor(100000 + Math.random() * 900000),
    };

    // Call the onRegister function and pass the new student object
    onRegister(newStudent);

    // Display an alert when registration is successful
    alert('Registration successful');
  };

  return (
    <div className="registration-container">
      <h2>Student Registration Page</h2>
      <form>
        <div className="form-group">
          <label>Student ID:</label>
          <input
            className="form-input"
            type="text"
            value={formData.studentID}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input
            className="form-input"
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            className="form-input"
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            className="form-input"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            className="form-input"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            className="form-input"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <input
            className="form-input"
            type="text"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Program:</label>
          <input
            className="form-input"
            type="text"
            value={formData.program}
            onChange={(e) => setFormData({ ...formData, program: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            className="form-input"
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            className="form-input"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <button type="button" className="register-button" onClick={handleRegistration}>
          Register
        </button>
      </form>
    </div>
  );
};

export default StudentRegistrationForm;
