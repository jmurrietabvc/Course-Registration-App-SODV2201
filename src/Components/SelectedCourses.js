import React from "react";

function SelectedCourses({ selectedCourses, handleCourseDeselect }) {
  return (
    <div>
      <h3>Registered Courses</h3>
      <ul>
        {selectedCourses.map((course) => (
          <li key={course.id}>
            {course.name} (Code: {course.code}){" "}
            <button onClick={() => handleCourseDeselect(course)}>
              Deselect
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectedCourses;
