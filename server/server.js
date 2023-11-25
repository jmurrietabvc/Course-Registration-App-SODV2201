const express = require("express");
const app = express();
const port = 5544;
const cors = require("cors");
const sql = require('mssql');

const { getCoursesFromDatabase, connectToDatabase, showPrograms, getPool } = require("./database");

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
    const result = await pool
      .request()
      .input("courseCode", sql.VarChar(100), courseCode)
      .input("courseName", sql.VarChar(100), courseName)
      .input("courseDescription", sql.VarChar(5000), courseDescription)
      .input("courseFees", sql.Money, courseFees)
      .query(`
        INSERT INTO courses (course_code, course_name, course_description, course_fees)
        VALUES (@courseCode, @courseName, @courseDescription, @courseFees)
      `);

    res.status(201).json({ message: "Course added successfully" });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Endpoint to update a course
app.put('/courses/:id', async (req, res) => {
  const courseId = req.params.id;
  const { course_code: courseCode, course_name: courseName, course_description: courseDescription, course_fees: courseFees } = req.body;


  try {
    console.log('Received update request for course ID:', courseId);
    console.log('Request payload:', req.body);

    const pool = getPool();
    await pool.connect();

    console.log('courseCode:', courseCode);
    console.log('courseName:', courseName);
    console.log('courseDescription:', courseDescription);
    console.log('courseFees:', courseFees);
    console.log('courseId:', courseId);
    
    const result = await pool
      .request()
      .input("courseCode", sql.NVarChar, courseCode)
      .input("courseName", sql.NVarChar, courseName)
      .input("courseDescription", sql.NVarChar, courseDescription)
      .input("courseFees", sql.Int, courseFees)
      .input("courseId", sql.Int, courseId)
      .query(`
        UPDATE courses
        SET course_code = @courseCode, course_name = @courseName, course_description = @courseDescription, course_fees = @courseFees
        WHERE course_id = @courseId
      `);
    


    console.log('Update result:', result);

    res.json({ message: "Course updated successfully" });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await pool.close();
  }
});






// Endpoint to delete a course
app.delete('/courses/:id', async (req, res) => {
  const courseId = req.params.id;

  try {
    const result = await pool
      .request()
      .input("courseId", sql.Int, courseId)
      .query('DELETE FROM courses WHERE courseId = @courseId');

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
