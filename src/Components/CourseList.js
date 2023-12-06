import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/courselist.css";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5544/courses");
        const fetchedCourses = response.data;
        setCourses(fetchedCourses);
        console.log("Courses fetched from the database:", fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const term = searchTerm.toLowerCase();
    return (
      course.course_name.toLowerCase().includes(term) ||
      course.course_code.toLowerCase().includes(term) ||
      course.course_description.toLowerCase().includes(term)
    );
  });

  console.log("Filtered Courses based on search term:", filteredCourses);

  return (
    <>
      <div className="courselisttable">
        <hr />
        <h3>Search for a Course &emsp;
          <input
            type="text"
            placeholder="Search by name, code, or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </h3>
        <hr />
        <table>
          <thead>
            <tr>
              {/* Uncomment if you want to display Course ID */}
              {/* <td>Course ID</td> */}
              <td>Course Name</td>
              <td>Course Code</td>
              <td>Description</td>
              <td>Cost</td>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.course_id}>
                {/* Uncomment if you want to display Course ID */}
                {/* <td>{course.course_id}</td> */}
                <td>{course.course_name}</td>
                <td>{course.course_code}</td>
                <td>{course.course_description}</td>
                <td>{`CAD ${course.course_fees}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CourseList;
