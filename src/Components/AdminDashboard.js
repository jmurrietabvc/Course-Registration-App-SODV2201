import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const itemsPerPage = 5;
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseFees, setCourseFees] = useState('');
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddCourseFields, setShowAddCourseFields] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5544/courses');
      console.log('Courses fetched successfully:', response.data);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error.message);
      console.error('Error details:', error.response);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  const searchCourses = () => {
    const query = searchQuery.toLowerCase();
    const filtered = courses.filter((course) => {
      const name = course.course_name ? course.course_name.toLowerCase() : '';
      const code = course.course_code ? course.course_code.toLowerCase() : '';
      const description = course.course_description ? course.course_description.toLowerCase() : '';

      return (
        name.includes(query) ||
        code.includes(query) ||
        description.includes(query)
      );
    });
    setFilteredCourses(filtered);
    setCurrentPage(1);
  };

  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5544/courses/${courseId}`);
      fetchCourses(); // Refresh the course list after deletion
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const addNewCourse = async () => {
    try {
      await axios.post('http://localhost:5544/courses', {
        course_name: courseName,
        course_code: courseCode,
        course_description: courseDescription,
        course_fees: courseFees, // Added course fees
      });
      fetchCourses(); // Refresh the course list after addition
      setCourseName('');
      setCourseCode('');
      setCourseDescription('');
      setCourseFees('');
    } catch (error) {
      console.error('Error adding new course:', error);
    }
  };

  const editCourse = (courseId) => {
    const courseToEdit = courses.find((course) => course.course_id === courseId);
    if (courseToEdit) {
      setCourseName(courseToEdit.course_name);
      setCourseCode(courseToEdit.course_code);
      setCourseDescription(courseToEdit.course_description);
      setCourseFees(courseToEdit.course_fees); // Set course fees
      setEditingCourseId(courseId); // Set the editing course ID
    }
  };

  const saveEditedCourse = async () => {
    try {
      console.log('Request payload:', {
        course_name: courseName,
        course_code: courseCode,
        course_description: courseDescription,
        course_fees: courseFees, // Added course fees
      });

      await axios.put(`http://localhost:5544/courses/${editingCourseId}`, {
        course_name: courseName,
        course_code: courseCode,
        course_description: courseDescription,
        course_fees: courseFees, // Added course fees
      });

      fetchCourses(); // Refresh the course list after edit
      setCourseName('');
      setCourseCode('');
      setCourseDescription('');
      setCourseFees('');
      setEditingCourseId(null);
    } catch (error) {
      console.error('Error saving edited course:', error);
    }
  };

  const cancelEdit = () => {
    setCourseName('');
    setCourseCode('');
    setCourseDescription('');
    setCourseFees('');
    setEditingCourseId(null);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const coursesToPaginate = searchQuery ? filteredCourses : courses;
    const indexOfLastCourse = pageNumber * itemsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
    const currentCourses = coursesToPaginate.slice(indexOfFirstCourse, indexOfLastCourse);
    //setCurrentCourses(currentCourses);
  };

  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = searchQuery ? filteredCourses : courses.slice(indexOfFirstCourse, indexOfLastCourse);

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>

      <div className="admin-dashboard-section">
        <h3>
          Search Courses &emsp;
          <input
            type="text"
            placeholder="Search by name, code, or description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          &emsp;
          <button className="admin-dashboard-button" onClick={searchCourses}>
            Search
          </button>
        </h3>
      </div>

      <div className="admin-dashboard-section">
        <table>
          <thead>
            <tr>
              <td>Course Name</td>
              <td>Course Code</td>
              <td>Description</td>
              <td>Course Fees</td> {/* Added Course Fees */}
              <td colSpan={2}>Tools</td>
            </tr>
          </thead>
          <tbody>
            {currentCourses.map((course) => (
              <tr key={course.course_id}>
                <td>{course.course_name}</td>
                <td>{course.course_code}</td>
                <td>{course.course_description}</td>
                <td>{course.course_fees}</td> {/* Display Course Fees */}
                <td>
                  <button className="admin-dashboard-button" onClick={() => editCourse(course.course_id)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="admin-dashboard-button" onClick={() => deleteCourse(course.course_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <ul className="pagination">
          {courses.length > itemsPerPage &&
            Array.from({ length: Math.ceil(courses.length / itemsPerPage) }, (_, index) => (
              <li key={index} className="page-item">
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
        </ul>
      </div>

      {editingCourseId && (
        <div className="editcourse">
          <h3>Edit Course</h3>
          Course Name:
          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
           Course Code:
          <input
            type="text"
            placeholder="Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
          Description:
          <textarea
            placeholder="Course Description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          />
          Course Fees:
          <input
            type="text"
            placeholder="Course Fees"
            value={courseFees}
            onChange={(e) => setCourseFees(e.target.value)}
          />
          <button className="admin-dashboard-button" onClick={() => saveEditedCourse()}>
            Save Edited Course
          </button>
          <button className="admin-dashboard-button" onClick={() => cancelEdit()}>
            Cancel
          </button>
        </div>
      )}

      <div className="admin-dashboard-section">
        <h3>
          Add New Course
          <br />
          <br />
          <button
            className="admin-dashboard-button"
            onClick={() => setShowAddCourseFields(!showAddCourseFields)}
          >
            Add New Course
          </button>
        </h3>
        {showAddCourseFields && (
          <div className="addcourse">
            Course Name:
            <input
              type="text"
              placeholder="Course Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
            Course Code:
            <input
              type="text"
              placeholder="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />
            Description:
            <textarea
              placeholder="Course Description"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
            Course Fees:
            <input
              type="text"
              placeholder="Course Fees"
              value={courseFees}
              onChange={(e) => setCourseFees(e.target.value)}
            />
            <button className="admin-dashboard-button" onClick={addNewCourse}>
              Add Course
            </button>
          </div>
        )}
      </div>

      <div className="admin-dashboard-section">
        <h3>
          <Link to="/">
            <button className="admin-logout-btn">Logout</button>
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default AdminDashboard;
