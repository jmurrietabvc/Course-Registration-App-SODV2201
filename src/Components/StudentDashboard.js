// StudentDashboard.js

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CourseRegistration from "./CourseRegistration";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Studentdashboard.css";

export const Studentdashboard = () => {
  const location = useLocation();
  const { student: initialStudent } = location.state;
  const programType = initialStudent.program;

  const [student, setStudent] = useState(initialStudent);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    // Fetch student details and enrolled courses
    const fetchStudent = async () => {
      try {
        const studentResponse = await axios.post(
          "http://localhost:5544/loggedstudent",
          {
            username: initialStudent.username,
          }
        );

        const { success: studentSuccess, detailedStudent } =
          studentResponse.data;

        if (studentSuccess) {
          setStudent(detailedStudent);

          // Fetch enrolled courses
          const coursesResponse = await axios.post(
            "http://localhost:5544/enrolledcourses",
            {
              studentId: detailedStudent.student_id,
            }
          );

          const { success: coursesSuccess, enrolledCourses } =
            coursesResponse.data;

          if (coursesSuccess) {
            setEnrolledCourses(enrolledCourses);
          } else {
            console.error("Error fetching enrolled courses");
          }
        } else {
          console.error("Error fetching student information");
        }
      } catch (error) {
        console.error("Error fetching student information", error);
      }
    };

    fetchStudent();
  }, [initialStudent]);

  const updateStudent = async () => {
    // Function to update the student information after enrolling or withdrawing from a course
    try {
      const response = await axios.post("http://localhost:5544/loggedstudent", {
        username: initialStudent.username,
      });

      const { success, detailedStudent } = response.data;

      if (success) {
        setStudent(detailedStudent);

        // Fetch updated enrolled courses
        const coursesResponse = await axios.post(
          "http://localhost:5544/enrolledcourses",
          {
            studentId: detailedStudent.student_id,
          }
        );

        const { success: coursesSuccess, enrolledCourses } =
          coursesResponse.data;

        if (coursesSuccess) {
          setEnrolledCourses(enrolledCourses);
        } else {
          console.error("Error fetching enrolled courses");
        }
      } else {
        console.error("Error updating student information");
      }
    } catch (error) {
      console.error("Error updating student information", error);
    }
  };

  const withdrawFromCourse = async (courseId) => {
    try {
      await axios.post("http://localhost:5544/withdraw", {
        studentId: student.student_id,
        courseId: courseId,
      });

      // Update enrolled courses after withdrawal
      const coursesResponse = await axios.post(
        "http://localhost:5544/enrolledcourses",
        {
          studentId: student.student_id,
        }
      );

      const { success: coursesSuccess, enrolledCourses } = coursesResponse.data;

      if (coursesSuccess) {
        setEnrolledCourses(enrolledCourses);
      } else {
        console.error("Error fetching enrolled courses");
      }
    } catch (error) {
      console.error("Error withdrawing from course", error);
    }
  };

  return (
    <div className="student-dashboard-container">
      <h2 className="student-dashboard-title">Student Dashboard</h2>

      <div className="dashboard-container">
        <div className="profile">
          <h2>Student Profile</h2>
          <div className="profile-info">
            <p>
              <span className="label">Name:</span> {student.student_firstName}
              <br />
              <span className="label">Last Name:</span>{" "}
              {student.student_lastName}
              <br />
              <span className="label">ID:</span> {student.student_id}
              <br />
              <span className="label">Email:</span> {student.email}
              <br />
              <span className="label">Phone:</span> {student.phone}
              <br />
              <span className="label">DOB:</span> {student.dob}
              <br />
              <span className="label">Program:</span> {student.department}
              <br />
              <span className="label">Username:</span> {student.username}
            </p>
          </div>
        </div>
        <br />

        <div className="courses">
          <h3>Enrolled Courses</h3>
          {/* Display enrolled courses here */}
          {enrolledCourses && enrolledCourses.length > 0 ? (
            <ul>
              {enrolledCourses.map((course) => (
                <li key={course.course_id}>
                  {course.course_name} (Code: {course.course_code})
                  <button onClick={() => withdrawFromCourse(course.course_id)}>
                    Withdraw
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No enrolled courses</p>
          )}

          <CourseRegistration
            programType={programType}
            studentId={student.student_id}
            updateStudent={updateStudent}
          />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/">
          <button className="admin-logout-btn">Logout</button>
        </Link>
      </div>
    </div>
  );
};
