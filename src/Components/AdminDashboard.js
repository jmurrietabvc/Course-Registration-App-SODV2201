// AdminDashboard.js
import React, { useState } from 'react';

const AdminDashboard = () => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const addCourse = () => {
    // Implement code to add a new course to the database
    // Use API requests to interact with the backend
  };

  const searchCourses = () => {
    // Implement code to search for courses based on course name or course code
    // Use API requests to interact with the backend
  };

  const deleteCourse = (courseId) => {
    // Implement code to delete a course
    // Use API requests to interact with the backend
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Add New Course</h3>
        <input type="text" placeholder="Course Name" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
        <input type="text" placeholder="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
        <button onClick={addCourse}>Add Course</button>
      </div>

      <div>
        <h3>Search for a Course</h3>
        <input type="text" placeholder="Search Query" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={searchCourses}>Search</button>
      </div>

      <div>
        <h3>Course List</h3>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              {course.courseName} (Code: {course.courseCode})
              <button onClick={() => deleteCourse(course.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
