import React, { useState } from "react";
import AdminLogin from "./AdminLogin";
import coursesData from "../data";
import { Link, useNavigate } from "react-router-dom";
import "../css/adminStyle.css";

const AdminDashboard = () => {
  const itemsPerPage = 5; // Number of courses per page
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courses, setCourses] = useState(coursesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddCourseFields, setShowAddCourseFields] = useState(false);

  const navigate = useNavigate(); // Get the navigate function

  const [filteredCourses, setFilteredCourses] = useState(coursesData); // Initialize with all courses

  const searchCourses = () => {
    const query = searchQuery.toLowerCase();
    const filtered = coursesData.filter(
      (course) =>
        course.name.toLowerCase().includes(query) ||
        course.code.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query)
    );
    setFilteredCourses(filtered);
    setCurrentPage(1);
  };

  const deleteCourse = (courseId) => {
    const updatedCourses = courses.filter((course) => course.id !== courseId);
    setCourses(updatedCourses);
  };

  const addNewCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      name: courseName,
      code: courseCode,
      description: courseDescription,
    };
    setCourses([...courses, newCourse]);
    setCourseName("");
    setCourseCode("");
    setCourseDescription("");
  };

  const editCourse = (courseId) => {
    setEditingCourseId(courseId);
    // Retrieve the course details for editing
    const courseToEdit = coursesData.find((course) => course.id === courseId);
    if (courseToEdit) {
      setCourseName(courseToEdit.name);
      setCourseCode(courseToEdit.code);
      setCourseDescription(courseToEdit.description);
    }
  };

  const saveEditedCourse = () => {
    const updatedCourses = courses.map((course) => {
      if (course.id === editingCourseId) {
        return {
          ...course,
          name: courseName,
          code: courseCode,
          description: courseDescription,
        };
      }
      return course;
    });
    setCourses(updatedCourses);
    setCourseName("");
    setCourseCode("");
    setCourseDescription("");
    setEditingCourseId(null);
  };

  const cancelEdit = () => {
    setCourseName("");
    setCourseCode("");
    setCourseDescription("");
    setEditingCourseId(null);
  };

  // Pagination
  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>

      <div className="admin-dashboard-section">
        {/* <h3>Edit  Student Profile</h3> */}
      </div>

      <div className="admin-dashboard-section">
        <h3>Search Courses</h3>
        <input
          type="text"
          placeholder="Search by name, code, or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="admin-dashboard-button" onClick={searchCourses}>
          Search
        </button>
      </div>

      <div className="admin-dashboard-section">
        {editingCourseId === null ? (
          <>
            <ul>
              {currentCourses.map((course) => (
                <li key={course.id}>
                  <strong>{course.name}</strong> ({course.code}) -{" "}
                  {course.description}
                  <button
                    className="admin-dashboard-button"
                    onClick={() => editCourse(course.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-dashboard-button"
                    onClick={() => deleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            {/* Pagination */}
            <ul className="pagination">
              {filteredCourses.length > itemsPerPage &&
                Array.from(
                  { length: Math.ceil(filteredCourses.length / itemsPerPage) },
                  (_, index) => (
                    <li key={index} className="page-item">
                      <button
                        className="page-link"
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
                )}
            </ul>
          </>
        ) : (
          <>
            <h3>Edit Course</h3>
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
            <textarea
              placeholder="Course Description"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
            <button
              className="admin-dashboard-button"
              onClick={saveEditedCourse}
            >
              Save Edited Course
            </button>
            <button className="admin-dashboard-button" onClick={cancelEdit}>
              Cancel
            </button>
          </>
        )}
      </div>

      <div className="admin-dashboard-section">
        <h3>Add New Course</h3>
        <button
          className="admin-dashboard-button"
          onClick={() => setShowAddCourseFields(!showAddCourseFields)}
        >
          Add New Course
        </button>
        {showAddCourseFields && (
          <div>
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
            <textarea
              placeholder="Course Description"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
            <button className="admin-dashboard-button" onClick={addNewCourse}>
              Add Course
            </button>
          </div>
        )}
      </div>

      <Link to="/">
        <button className="admin-logout-btn">Logout</button>
      </Link>
    </div>
  );
};

export default AdminDashboard;
