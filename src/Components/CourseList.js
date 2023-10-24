// CourseList.js

import React from "react";
import courses from "../data"; // Updated import path
 function CourseList() {
  return (
    <div>
      <h1>List of all Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <strong>{course.name}</strong> ({course.code}) - {course.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;