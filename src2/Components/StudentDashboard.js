import React from "react";
import { useLocation } from "react-router-dom";
import CourseRegistration from "./CourseRegistration";

export const Studentdashboard = () => {
  const location = useLocation();
  const { student } = location.state;

  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>

      <div className="profile">
        <h2>Student Profile</h2>
        <p>Name: {student.firstName}</p>
        <p>ID: {student.id}</p>
        <p>Department: {student.department}</p>
        <p>Program: {student.program}</p>
      </div>

      <div className="courses">
        
        {/* Placeholder for future courses functionality */}
        <CourseRegistration/>
        
      </div>
    </div>
  );
};
