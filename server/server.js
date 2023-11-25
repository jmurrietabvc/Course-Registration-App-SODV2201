const express = require("express");
const app = express();
const port = 5544;
const cors = require("cors");
const sql = require('mssql');

const { connectToDatabase, showPrograms, getCoursesFromDatabase, addCourse, updateCourse, deleteCourse, getPool } = require("./database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    const courses = await getCoursesFromDatabase();
    res.json(courses);
  } catch (error) {
    console.error('Error getting courses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to add a new course
app.post('/courses', async (req, res) => {
  const { courseCode, courseName, courseDescription, courseFees } = req.body;

  try {
    await addCourse({
      courseCode,
      courseName,
      courseDescription,
      courseFees,
    });

    res.status(201).json({ message: "Course added successfully" });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to update a course
app.put('/courses/:id', async (req, res) => {
  const courseId = req.params.id;
  const { courseCode, courseName, courseDescription, courseFees } = req.body;

  try {
    console.log('Received update request for course ID:', courseId);
    console.log('Request payload:', req.body);

    await updateCourse(courseId, {
      courseCode,
      courseName,
      courseDescription,
      courseFees,
    });

    res.json({ message: "Course updated successfully" });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to delete a course
app.delete('/courses/:id', async (req, res) => {
  const courseId = req.params.id;

  try {
    await deleteCourse(courseId);

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
