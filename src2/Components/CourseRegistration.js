import React, { useState } from 'react';
import CourseSearch from './CourseSearch';

const CourseRegistration = () => {
  const [selectedTerm, setSelectedTerm] = useState('Term1'); // Initialize with the first term
  const [selectedCourses, setSelectedCourses] = useState([]); // Store selected courses

  const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4']; // Replace with your term data

  // Sample course data for each term (replace with your course data)
  const courseData = {
    Term1: [
      {id: 1, name: "Project management1", code: "Pr111" },
      {id: 2, name: "C++ Programming Fundamentals", code: "C++111" },
      {id: 3, name: "Computer Maintenance", code: "CompM1111"},
      {id: 4, name: "Information Security1", code: "IS1111"},
    ],
    Term2: [
      {id: 5, name: "Networking", code: "Net222"},
      {id: 6, name: "Web technology", code: "Web222"},
      {id: 7, name: "Project Management2", code: "Pr222"},
    ],
    Term3: [
      {id: 8, name: "Advanced Project management1", code: "Pr333"},
      {id: 9, name: "Advanced C++ Programming Fundamentals", code: "C++333"},
      {id: 10, name: "Advanced Computer Maintenance", code: "CompM333"},
      {id: 11, name: "Advanced Information Security1", code: "IS333"},
    ],
    Term4: [
      {id: 12, name: "Advanced Networking", code: "Net444"},
      {id: 13, name: "Advanced Web technology", code: "Web444"},
      {id: 14, name: "Advanced Project Management2", code: "Pro444"},
    ],
  };

  // Function to handle course selection
  const handleCourseSelect = (course) => {
    // Check if the course is already selected
    if (!selectedCourses.find((selectedCourse) => selectedCourse.id === course.id)) {
      // Add the course to the selectedCourses array
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  // Function to handle course deselection
  const handleCourseDeselect = (course) => {
    // Remove the course from the selectedCourses array
    setSelectedCourses(selectedCourses.filter((selectedCourse) => selectedCourse.id !== course.id));
  };

  return (
    <div>
      <h2>Course Registration</h2>
      <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)}>
        {terms.map((term) => (
          <option key={term} value={term}>
            {term}
          </option>
        ))}
      </select>
      <CourseSearch/>
      <h3>Select Courses for {selectedTerm}</h3>
      <ul>
        {courseData[selectedTerm].map((course) => (
          <li key={course.id}>
            {course.name} (Code: {course.code})
            {selectedCourses.find((selectedCourse) => selectedCourse.id === course.id) ? (
              <button onClick={() => handleCourseDeselect(course)}>Deselect</button>
            ) : (
              <button onClick={() => handleCourseSelect(course)}>Select</button>
            )}
          </li>
        ))}
      </ul>
      {/* <h3>Selected Courses</h3>
      <ul>
        {selectedCourses.map((course) => (
          <li key={course.id}>
            {course.name} (Code: {course.code})
            <button onClick={() => handleCourseDeselect(course)}>Deselect</button>
          </li>
        ))}
      </ul> */}
      <h3>My Courses</h3>
      <ul>
        {selectedCourses.map((course) => (
          <li key={course.id}>
            {course.name} (Code: {course.code})
           
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default CourseRegistration;
