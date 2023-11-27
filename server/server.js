const express = require("express");
const app = express();
const port = 5544;
const cors = require("cors");
const sql = require('mssql');

const {
  connectToDatabase,
  loginStudent,
  showPrograms,
  getCoursesFromDatabase,
  addCourse,
  updateCourse,
  deleteCourse,
  getPool
} = require("./database");

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

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

// Endpoint to get all courses
app.get('/courses', async (req, res) => {
  try {
    const { search } = req.query;

    // Fetch all courses from the database
    let courses = await getCoursesFromDatabase();

    // If a search query is provided, filter the courses
    if (search) {
      const query = search.toLowerCase();
      courses = courses.filter((course) => {
        const name = course.course_name ? course.course_name.toLowerCase() : '';
        const code = course.course_code ? course.course_code.toLowerCase() : '';
        const description = course.course_description ? course.course_description.toLowerCase() : '';

        return name.includes(query) || code.includes(query) || description.includes(query);
      });
    }

    res.json(courses);
  } catch (error) {
    console.error('Error getting courses:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});




// Endpoint to update a course
app.put('/courses/:id', async (req, res) => {
  const courseId = req.params.id;
  const {
    courseCode,
    courseName,
    courseDescription,
    courseFees
  } = req.body;

  try {
    console.log('Received update request for course ID:', courseId);
    console.log('Request payload:', req.body);

    await updateCourse(courseId, {
      courseCode,
      courseName,
      courseDescription,
      courseFees,
    });

    res.json({
      message: "Course updated successfully"
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

// Endpoint to add a new course
app.post('/courses', async (req, res) => {
  const {
    courseCode,
    courseName,
    courseDescription,
    courseFees
  } = req.body;

  try {
    await addCourse({
      courseCode,
      courseName,
      courseDescription,
      courseFees,
    });

    res.status(201).json({
      message: "Course added successfully"
    });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

// Endpoint to delete a course
app.delete('/courses/:id', async (req, res) => {
  const courseId = req.params.id;

  try {
    await deleteCourse(courseId);

    res.json({
      message: "Course deleted successfully"
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


//Student
//route to register a student
app.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    program,
    username,
    password,
  } = req.body;
  try {
    // Call a function to register the student in the database
    await registerStudent({
      firstName,
      lastName,
      email,
      phone,
      dob,
      program,
      username,
      password,
    });
    res.status(201).json({
      message: "Registration successful"
    });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});
// //route to login a student
// app.post("/login", async (req, res) => {
//   const {
//     username,
//     password
//   } = req.body;
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
//         student
//       });
//     } else {
//       // Authentication failed
//       res.json({
//         success: false
//       });
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error"
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
        res.status(400).send("success: false" );
    }
  });

