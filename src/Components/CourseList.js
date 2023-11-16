import React from "react";
import coursesData from "../data"; // Updated import path
import CourseSearch from "./CourseSearch";
import "../css/courselist.css";



function CourseList() {
  return (
    <>
      <div class="courselisttable">

        <CourseSearch />
        <table>
          <thead>
            {/* <td>Course ID</td> */}
            <td>Course Name</td>
            <td>Course Code</td>
            <td>Description</td>
          </thead>
          {coursesData.map(
            (
              course // Updated variable name to coursesData
            ) => (
              <tr key={course.id}>
                {/* <td>{course.id}</td> */}
                <td>{course.name}</td>
                <td>{course.code}</td>
                <td>{course.description}</td>
              </tr>
            )
          )}
        </table>
      </div>
    </>
  );
}

export default CourseList;
