const express = require("express");
const app = express();
const port = 5544;
const cors = require("cors");
const sql = require("mssql");

const {
  connectToDatabase,
  loginStudent,
  showPrograms,
  getProgramByName,
  getCoursesFromDatabase,
  addCourse,
  updateCourse,
  deleteCourse,
  registerStudent,
  getDetailedStudent,
  enrollStudentInCourse,
  withdrawStudentFromCourse,
  getEnrolledCourses,
  getPool,
} = require("./database");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

connectToDatabase();
const pool = getPool();

app.get("/programs", async (req, res) => {
  const programs = await showPrograms();
  res.json(programs);
});

app.get("/program/:name", async (req, res) => {
  const programName = req.params.name;
  const program = await getProgramByName(programName);

  if (program ?? false) {
    res.json({
      success: true,
      program,
    });
  } else {
    res.status(400).send("success: false");
  }
});

// Endpoint to get all courses
app.get("/courses", async (req, res) => {
  try {
    const { search } = req.query;

    // Fetch all courses from the database
    let courses = await getCoursesFromDatabase();

    // If a search query is provided, filter the courses
    if (search) {
      const query = search.toLowerCase();
      courses = courses.filter((course) => {
        const name = course.course_name ? course.course_name.toLowerCase() : "";
        const code = course.course_code ? course.course_code.toLowerCase() : "";
        const description = course.course_description
          ? course.course_description.toLowerCase()
          : "";

        return (
          name.includes(query) ||
          code.includes(query) ||
          description.includes(query)
        );
      });
    }

    res.json(courses);
  } catch (error) {
    console.error("Error getting courses:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Endpoint to update a course
app.put("/courses/:id", async (req, res) => {
  const courseId = req.params.id;
  const { courseCode, courseName, courseDescription, courseFees } = req.body;

  try {
    console.log("Received update request for course ID:", courseId);
    console.log("Request payload:", req.body);

    await updateCourse(courseId, {
      courseCode,
      courseName,
      courseDescription,
      courseFees,
    });

    res.json({
      message: "Course updated successfully",
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Endpoint to add a new course
app.post("/courses", async (req, res) => {
  const { courseCode, courseName, courseDescription, courseFees } = req.body;

  try {
    await addCourse({
      courseCode,
      courseName,
      courseDescription,
      courseFees,
    });

    res.status(201).json({
      message: "Course added successfully",
    });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Endpoint to delete a course
app.delete("/courses/:id", async (req, res) => {
  const courseId = req.params.id;

  try {
    await deleteCourse(courseId);

    res.json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});


//Student
//route to register a student
app.post("/register", async (req, res) => {
  const {
    student_firstName,
    student_lastName,
    email,
    phone,
    dob,
    department,
    program_id,
    username,
    password,
  } = req.body;
  try {
    // Call a function to register the student in the database
    await registerStudent({
      student_firstName,
      student_lastName,
      email,
      phone,
      dob,
      department,
      program_id,
      username,
      password,
    });
    res.status(201).json({
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

// Endpoint to get all programs
app.get("/programs", async (req, res) => {
  try {
    const programs = await showPrograms();
    res.json(programs);
  } catch (error) {
    console.error("Error getting programs:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// //route to login a student
// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     // Query the database to find the user with the provided username and password
//     const result = await pool
//       .request()
//       .input("username", sql.NVarChar, username)
//       .input("password", sql.NVarChar, password)
//       .query(
//         "SELECT * FROM students WHERE username = @username AND password = @password"
//       );
//     if (result.recordset.length > 0) {
//       // Authentication successful
//       const student = result.recordset[0];
//       res.json({
//         success: true,
//         student,
//       });
//     } else {
//       // Authentication failed
//       res.json({
//         success: false,
//       });
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// });

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await loginStudent(username, password);

  if (user ?? false) {
    res.json({
      success: true,
      user,
    });
  } else {
    res.status(400).send("success: false");
  }
});

// Endpoint to get detailed student information
app.post("/loggedstudent", async (req, res) => {
  const { username } = req.body;

  console.log(`Received request for detailed student information. Username: ${username}`);

  try {
    const detailedStudent = await getDetailedStudent(username);

    if (detailedStudent) {
      // Format the date of birth to a readable string
      detailedStudent.dob = detailedStudent.dob.toLocaleDateString();

      console.log("Fetched detailed student information:", detailedStudent);
      res.json({
        success: true,
        detailedStudent,
      });
    } else {
      console.log("Error fetching detailed student information. Student not found.");
      res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
  } catch (error) {
    console.error("Error fetching detailed student information:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Endpoint to enroll a student in a course
app.post("/enroll", async (req, res) => {
  const { studentId, courseId } = req.body;
  try {
    await enrollStudentInCourse(studentId, courseId);
    res.json({
      message: "Student enrolled in course successfully",
    });
  } catch (error) {
    console.error("Error enrolling student in course:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// Endpoint to withdraw a student from a course
app.post("/withdraw", async (req, res) => {
  const { studentId, courseId } = req.body;
  try {
    await withdrawStudentFromCourse(studentId, courseId);
    res.json({
      message: "Student withdrawn from course successfully",
    });
  } catch (error) {
    console.error("Error withdrawing student from course:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.post("/enrolledcourses", async (req, res) => {
  const { studentId } = req.body;

  try {
    const enrolledCourses = await getEnrolledCourses(studentId);

    res.json({
      success: true,
      enrolledCourses,
    });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});





app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});




