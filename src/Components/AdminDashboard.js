import React, { useState } from 'react';
import CourseSearch from './CourseSearch';
import courses from '../data';


const AdminDashboard = () => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentProfile, setStudentProfile] = useState({});
  const [editingStudentProfile, setEditingStudentProfile] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);

  const addCourse = () => {
    // Placeholder: Simulate adding a new course (not connected to a real API or database)
    // You can update the 'courses' state with the new course data
    const newCourse = {
      id: courses.length + 1,
      courseName,
      courseCode,
    };
    setCourses([...courses, newCourse]);

    // Reset input fields
    setCourseName('');
    setCourseCode('');
  };

  const searchCourses = () => {
    // Placeholder: Simulate searching for courses based on course name or course code
    // This example just filters the courses based on the searchQuery
    const filteredCourses = courses.filter(
      (course) =>
        course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCourses(filteredCourses);
  };

  const deleteCourse = (courseId) => {
    // Placeholder: Simulate deleting a course by ID
    // You can update the 'courses' state by filtering out the course with the given ID
    const updatedCourses = courses.filter((course) => course.id !== courseId);
    setCourses(updatedCourses);
  };

  const editCourse = (courseId) => {
    // Placeholder: Simulate editing a course by ID
    // You can update the 'courses' state with the edited course data
    // In this example, we set the course to edit based on the courseId
    const courseToEdit = courses.find((course) => course.id === courseId);
    if (courseToEdit) {
      setCourseName(courseToEdit.courseName);
      setCourseCode(courseToEdit.courseCode);
      setEditingCourseId(courseId);
    }
  };

  const saveEditedCourse = () => {
    // Placeholder: Save the edited course (not connected to a real API or database)
    // Update the 'courses' state with the edited course data
    const updatedCourses = courses.map((course) => {
      if (course.id === editingCourseId) {
        return {
          ...course,
          courseName,
          courseCode,
        };
      }
      return course;
    });
    setCourses(updatedCourses);

    // Reset input fields and editingCourseId
    setCourseName('');
    setCourseCode('');
    setEditingCourseId(null);
  };

  const editStudentProfile = () => {
    // Placeholder: Simulate editing a student profile (not connected to a real API or database)
    // You can update the 'studentProfile' state with the edited profile data
    setEditingStudentProfile(false);
  };

  const addNewCourse = () => {
    // Create a new course object
    const newCourse = {
      id: courses.length + 1, // Assign a unique ID
      courseName,
      courseCode,
    };
  
    // Update the courses state
    setCourses([...courses, newCourse]);
  
    // Reset input fields
    setCourseName('');
    setCourseCode('');
  };
  

  return (
    <div>
      <h2>Admin Dashboard</h2>
     

  

      <div>
       
        <h3>Edit Student Profile</h3>
        {editingStudentProfile ? (
          <div>
            {/* Input fields for editing student profile */}
            <button onClick={editStudentProfile}>Save</button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            <button onClick={() => setEditingStudentProfile(true)}>Edit Profile</button>
          </div>
        )}

    
        </div>
  <CourseSearch></CourseSearch>
        <div>
       <div>
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
  <button onClick={addNewCourse}>Add Course</button>
  </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
