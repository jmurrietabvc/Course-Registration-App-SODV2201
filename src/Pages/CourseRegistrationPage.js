import React, { useState } from 'react';
import courses from '../data'; // Import the course data from data.js

const CourseRegistrationPage = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  const handleCourseSelection = (event) => {
    const selectedCourseName = event.target.value;
    setSelectedCourse(selectedCourseName);

    // Find the selected course and set its description
    const selectedCourse = courses.find((course) => course.name === selectedCourseName);
    if (selectedCourse) {
      setCourseDescription(selectedCourse.description);
    } else {
      setCourseDescription('');
    }
  };

  const handleCourseRegistration = () => {
    // Implement the course registration logic here
    // You can make an API request to register the student in the selected course
    alert(`Registered for ${selectedCourse} course!`);
  };

  return (
    <div>
      <h2>Course Registration Page</h2>
      <p>Select a course to register:</p>
      <select value={selectedCourse} onChange={handleCourseSelection}>
        <option value="">Select a course</option>
        {courses.map((course) => (
          <option key={course.id} value={course.name}>
            {course.name}
          </option>
        ))}
      </select>
      <h3>Course Description:</h3>
      <p>{courseDescription}</p>
      <button onClick={handleCourseRegistration}>Register for Course</button>
    </div>
  );
};

export default CourseRegistrationPage;
