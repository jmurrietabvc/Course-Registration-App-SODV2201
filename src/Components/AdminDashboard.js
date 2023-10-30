import React, { useState } from 'react';
import CourseSearch from './CourseSearch';
import coursesData from '../data'; // Make sure you import coursesData
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courses, setCourses] = useState(coursesData); // Initialize courses with your data
  const [searchQuery, setSearchQuery] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentProfile, setStudentProfile] = useState({});
  const [editingStudentProfile, setEditingStudentProfile] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);

  const addCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      name: courseName, // Changed to 'name' to match your data
      code: courseCode, // Changed to 'code' to match your data
    };
    setCourses([...courses, newCourse]);
    setCourseName('');
    setCourseCode('');
  };

  const searchCourses = () => {
    const filteredCourses = coursesData.filter(
      (course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCourses(filteredCourses);
  };

  const deleteCourse = (courseId) => {
    const updatedCourses = courses.filter((course) => course.id !== courseId);
    setCourses(updatedCourses);
  };

  const editCourse = (courseId) => {
    const courseToEdit = courses.find((course) => course.id === courseId);
    if (courseToEdit) {
      setCourseName(courseToEdit.name); // Use 'name' to match your data
      setCourseCode(courseToEdit.code); // Use 'code' to match your data
      setEditingCourseId(courseId);
    }
  };

  const saveEditedCourse = () => {
    const updatedCourses = courses.map((course) => {
      if (course.id === editingCourseId) {
        return {
          ...course,
          name: courseName, // Use 'name' to match your data
          code: courseCode, // Use 'code' to match your data
        };
      }
      return course;
    });
    setCourses(updatedCourses);
    setCourseName('');
    setCourseCode('');
    setEditingCourseId(null);
  };

  const editStudentProfile = () => {
    // Placeholder: Simulate editing a student profile
    setEditingStudentProfile(false);
  };

  const addNewCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      name: courseName, // Use 'name' to match your data
      code: courseCode, // Use 'code' to match your data
    };
    setCourses([...courses, newCourse]);
    setCourseName('');
    setCourseCode('');
  };

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>

      <div className="admin-dashboard-section">
        <h3>Edit Student Profile</h3>
        {editingStudentProfile ? (
          <div>
            {/* Input fields for editing student profile */}
            <button className="admin-dashboard-button" onClick={editStudentProfile}>
              Save
            </button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            <button className="admin-dashboard-button" onClick={() => setEditingStudentProfile(true)}>
              Edit Profile
            </button>
          </div>
        )}
      </div>

      <CourseSearch onSearch={searchCourses} />
      
      {/* Display the list of courses */}
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <strong>{course.name}</strong> ({course.code}) - {course.description}
            <button className="admin-dashboard-button" onClick={() => editCourse(course.id)}>
              Edit
            </button>
            <button className="admin-dashboard-button" onClick={() => deleteCourse(course.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Add New Course section */}
      <div className="admin-dashboard-section">
        <h3>Add New Course</h3>
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />
     {editingCourseId !== null ? (
  <button className="admin-dashboard-button" onClick={saveEditedCourse}>
    Save Edited Course
  </button>
) : (
  <button className="admin-dashboard-button" onClick={addNewCourse}>
    Add Course
  </button>
)}

      </div>
      
      <Link to="/admin-login\">
        <button className="admin-logout-btn">Logout</button>
      </Link>
    </div>
  );
};

export default AdminDashboard;
