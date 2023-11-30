import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CourseRegistration from "./CourseRegistration";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/StudentForm.css";

export const Studentdashboard = () => {
  const location = useLocation();
  const { student: initialStudent } = location.state;
  const programType = initialStudent.program;

  const [student, setStudent] = useState(initialStudent);



useEffect(() => {
  console.log("Username for request:", initialStudent.username); // Add this line

  const fetchStudent = async () => {
    try {
      const response = await axios.post("http://localhost:5544/loggedstudent", {
        username: initialStudent.username,
      });

      const { success, detailedStudent } = response.data;

      if (success) {
        setStudent(detailedStudent);
      } else {
        console.error("Error fetching student information");
      }
    } catch (error) {
      console.error("Error fetching student information", error);
    }
  };

  fetchStudent();
}, [initialStudent]);





  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>

      <div className="profile">
        <h2>Student Profile</h2>
        <h4>
          Name: {student.student_firstName} ; ID: {student.student_id} ; Email: {student.email} ;
          Phone: {student.phone} ; DOB: {student.dob} ; Program ID: {student.program_id} ;
          Username: {student.username}
        </h4>
      </div>

      <div className="courses">
        {/* Placeholder for future courses functionality */}
        <CourseRegistration programType={programType} />
      </div>

      <Link to="/">
        <button className="admin-logout-btn">Logout</button>
      </Link>
    </div>
  );
};