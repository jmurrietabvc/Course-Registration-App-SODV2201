import React, { useState } from 'react';

const CourseRegistration = () => {
  const [selectedTerm, setSelectedTerm] = useState('Term1'); // Initialize with the first term
  const [selectedCourses, setSelectedCourses] = useState([]); // Store selected courses

  const terms = ['Term1', 'Term2', 'Term3', 'Term4']; // Replace with your term data

  // Sample course data for each term (replace with your course data)
  const courseData = {
    Term1: [
      { id: 1, name: 'Project Management1', code: 'Pr111' },
      { id: 2, name: 'C++ Programming Fundamentals', code: 'C++111' },
      // Add more courses for Term1
    ],
    Term2: [
      { id: 3, name: 'Networking', code: 'Net222' },
      { id: 4, name: 'Web Technology', code: 'Web222' },
      // Add more courses for Term2
    ],
    // Add data for Term3 and Term4
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
      <h3>Selected Courses</h3>
      <ul>
        {selectedCourses.map((course) => (
          <li key={course.id}>
            {course.name} (Code: {course.code})
            <button onClick={() => handleCourseDeselect(course)}>Deselect</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseRegistration;
