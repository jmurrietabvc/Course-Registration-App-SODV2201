import React from "react";
import courses from "../data"; // Updated import path
import CourseSearch from "./CourseSearch";

function CourseList() {
  return (
    <div>
      <h1>List of all Courses</h1>
      <CourseSearch />
      <ul className="course-list">
        {courses.map((course) => (
          <li key={course.id} className="course-item">
            <strong>{course.name}</strong> ({course.code}) - {course.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
