import React from "react";
import { useLocation } from "react-router-dom";
import CourseRegistration from "./CourseRegistration";
import SelectedCourses from "./SelectedCourses";
import { Link, useNavigate } from "react-router-dom";

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
        <p>Name: {student.firstName}</p>
        <p>ID: {student.id}</p>
        <p>Department: {student.department}</p>
        <p>Program: {student.program}</p>
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
