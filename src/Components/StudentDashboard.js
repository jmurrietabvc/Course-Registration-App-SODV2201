import React from "react";
import { useLocation } from "react-router-dom";
import CourseRegistration from "./CourseRegistration";
import SelectedCourses from "./SelectedCourses";
import { Link, useNavigate } from "react-router-dom";
import "../css/StudentForm.css";

export const Studentdashboard = () => {
  const location = useLocation();
  const { student } = location.state;
  const programType = student.program;

  // Load selected courses from localStorage or an appropriate source
  const selectedCourses = JSON.parse(
    localStorage.getItem("selectedCourses") || "[]"
  );

  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>

      <div className="profile">
        <h2>Student Profile</h2>
        <h4>
        Name: {student.firstName} &emsp;
        ID: {student.id} &emsp;
        Department: {student.department} &emsp;
        Program: {student.program} &emsp;
        </h4>
        <div className="selected-courses">
          <SelectedCourses selectedCourses={selectedCourses} />
        </div>
      </div>

      <div className="courses">
        {/* Placeholder for future courses functionality */}
        <CourseRegistration programType={programType} />
        {/* Pass programType as a prop */}
      </div>
      <Link to="/">
        <button className="admin-logout-btn">Logout</button>
      </Link>
    </div>
  );
};
