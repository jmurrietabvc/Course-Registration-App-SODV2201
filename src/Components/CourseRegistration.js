import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseRegistration = ({ programType, studentId, updateStudent }) => {
  const [selectedTerm, setSelectedTerm] = useState("your Program");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5; // You can adjust the number of courses per page

  const terms = {
    Certificate: ["Term1"],
    "Post Diploma": ["Term1", "Term2"],
    Diploma: ["Term1", "Term2", "Term3", "Term4"],
  }[programType] || [];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5544/courses?term=${selectedTerm}`
        );

        console.log("API Response:", response.data);

        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setErrorMessage("Error fetching courses");
      }
    };

    fetchCourses();
  }, [selectedTerm]);

  const enrollStudentInCourse = async (courseId) => {
    try {
      await axios.post("http://localhost:5544/enroll", {
        studentId,
        courseId,
      });

      // Update the selectedCourses state
      setSelectedCourses((prevSelectedCourses) => [
        ...prevSelectedCourses,
        courseData.find((course) => course.course_id === courseId),
      ]);

      // Update the student profile
      updateStudent();
    } catch (error) {
      console.error("Error enrolling student in course:", error);
    }
  };

  const withdrawStudentFromCourse = async (courseId) => {
    try {
      await axios.post("http://localhost:5544/withdraw", {
        studentId,
        courseId,
      });

      // Update the selectedCourses state
      setSelectedCourses((prevSelectedCourses) =>
        prevSelectedCourses.filter((course) => course.course_id !== courseId)
      );

      // Update the student profile
      updateStudent();
    } catch (error) {
      console.error("Error withdrawing student from course:", error);
    }
  };

  return (
    <div className="">
      <h2>Course Registration</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <select
          value={selectedTerm}
          onChange={(e) => setSelectedTerm(e.target.value)}
        >
          {terms &&
            terms.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
        </select> */}
        
        {/* Add the search bar */}
        <input
          type="text"
          placeholder="Search courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h3>Select Courses for {selectedTerm}</h3>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      {/* Modify the rendering of courses for search and pagination */}
      <ul>
        {courseData
          .filter((course) =>
            course.course_name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage)
          .map((course) => (
            <li key={course.course_id}>
              {course.course_name} (Code: {course.course_code})
              {selectedCourses.find(
                (selectedCourse) =>
                  selectedCourse.course_id === course.course_id
              ) ? (
                <button onClick={() => withdrawStudentFromCourse(course.course_id)}>
                  Withdraw
                </button>
              ) : (
                <button onClick={() => enrollStudentInCourse(course.course_id)}>
                  Enroll
                </button>
              )}
            </li>
          ))}
      </ul>
      
      {/* Add pagination controls */}
      <div>
        <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * coursesPerPage >= courseData.length}
        >
          Next
        </button>
      </div>

      <h3>Selected Courses</h3>
      <br />
      <ul>
        {selectedCourses.map((course) => (
          <li key={course.course_id}>
            {course.course_name} (Code: {course.course_code})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseRegistration;
