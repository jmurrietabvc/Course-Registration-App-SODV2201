import React, { useState } from "react";
import CourseSearch from "./CourseSearch";

const CourseRegistration = ({ programType }) => {
  const [selectedTerm, setSelectedTerm] = useState("Term1");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const terms = {
    Certificate: ["Term1"],
    "Post Diploma": ["Term1", "Term2"],
    Diploma: ["Term1", "Term2", "Term3", "Term4"],
  }[programType];

  const courseData = {
    Term1: [
      { id: 1, name: "Project management1", code: "Pr111" },
      { id: 2, name: "C++ Programming Fundamentals", code: "C++111" },
      { id: 3, name: "Computer Maintenance", code: "CompM1111" },
      { id: 4, name: "Information Security1", code: "IS1111" },
    ],
    Term2: [
      { id: 5, name: "Networking", code: "Net222" },
      { id: 6, name: "Web technology", code: "Web222" },
      { id: 7, name: "Project Management2", code: "Pr222" },
    ],
    Term3: [
      { id: 8, name: "Advanced Project management1", code: "Pr333" },
      { id: 9, name: "Advanced C++ Programming Fundamentals", code: "C++333" },
      { id: 10, name: "Advanced Computer Maintenance", code: "CompM333" },
      { id: 11, name: "Advanced Information Security1", code: "IS333" },
    ],
    Term4: [
      { id: 12, name: "Advanced Networking", code: "Net444" },
      { id: 13, name: "Advanced Web technology", code: "Web444" },
      { id: 14, name: "Advanced Project Management2", code: "Pro444" },
    ],
  };

  const maxCoursesAllowed = {
    Certificate: 1,
    Diploma: { min: 2, max: 5 },
    "Post Diploma": { min: 2, max: 5 },
  };

  const COURSES_STORAGE_KEY = "selectedCourses";

  // Function to handle course selection
  const handleCourseSelect = (course) => {
    if (selectedCourses.length >= maxCoursesAllowed[programType]) {
      window.alert(
        "Error: You have reached the maximum course limit for this program."
      );
    } else if (
      !selectedCourses.find((selectedCourse) => selectedCourse.id === course.id)
    ) {
      setSelectedCourses((prevSelectedCourses) => {
        const updatedSelectedCourses = [...prevSelectedCourses, course];
        // Save the updated selected courses in localStorage
        localStorage.setItem(
          COURSES_STORAGE_KEY,
          JSON.stringify(updatedSelectedCourses)
        );
        return updatedSelectedCourses;
      });
      setErrorMessage("");
    }
  };

  // Function to handle course deselection
  // const handleCourseDeselect = (course) => {
  //   setSelectedCourses(
  //     selectedCourses.filter(
  //       (selectedCourse) => selectedCourse.id !== course.id
  //     )
  //   );
  // };

  const handleCourseDeselect = (course) => {
    const updatedSelectedCourses = selectedCourses.filter(
      (selectedCourse) => selectedCourse.id !== course.id
    );
    setSelectedCourses(updatedSelectedCourses);

    // Save the updated selected courses in localStorage
    localStorage.setItem(
      COURSES_STORAGE_KEY,
      JSON.stringify(updatedSelectedCourses)
    );
    return updatedSelectedCourses;
  };

  return (
    <div>
      <h2>Course Registration</h2>
      <select
        value={selectedTerm}
        onChange={(e) => setSelectedTerm(e.target.value)}
      >
        {terms.map((term) => (
          <option key={term} value={term}>
            {term}
          </option>
        ))}
      </select>
      {/* <SelectedCourses
        selectedCourses={selectedCourses}
        handleCourseDeselect={handleCourseDeselect}
      /> */}
      <CourseSearch />
      <h3>Select Courses for {selectedTerm}</h3>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <ul>
        {courseData[selectedTerm].map((course) => (
          <li key={course.id}>
            {course.name} (Code: {course.code})
            {selectedCourses.find(
              (selectedCourse) => selectedCourse.id === course.id
            ) ? (
              <button onClick={() => handleCourseDeselect(course)}>
                Deselect
              </button>
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
