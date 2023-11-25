const sql = require("mssql");

// Connection configuration
const config = {
  user: "Admin123",
  password: "Admin123",
  server: "localhost",
  database: "cr",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Create a pool object
const pool = new sql.ConnectionPool(config);

module.exports = {
  // Function to connect to the database
  connectToDatabase: async function () {
    try {
      await pool.connect();
      console.log("Connected to the database");
    } catch (err) {
      console.error("Error connecting to the database:", err);
    }
  },

  // Function to show programs table
  showPrograms: async function () {
    try {
      const result = await pool.request().query("SELECT * FROM programs");
      console.log(result.recordset);
      return result.recordset;
    } catch (err) {
      console.error("Error querying the database:", err);
    }
  },

  // Function to show courses table
  showCourses: async function () {
    try {
      const result = await pool.request().query("SELECT * FROM courses");
      console.log(result.recordset);
      return result.recordset;
    } catch (err) {
      console.error("Error querying the database:", err);
    }
  },

  // Function to fetch courses from the database
getCoursesFromDatabase: async function () {
  try {
    const result = await pool.request().query("SELECT * FROM courses");
    return result.recordset;
  } catch (error) {
    console.error("Error fetching courses from MSSQL database:", error);
    throw error;
  }
},
 

 // Function to update a course
updateCourse: async function (courseId, course) {
  try {

    console.log('Updating course with the following data:');
    console.log('courseCode:', course.courseCode);
    console.log('courseName:', course.courseName);
    console.log('courseDescription:', course.courseDescription);
    console.log('courseFees:', course.courseFees);
    console.log('courseId:', courseId);

    const result = await pool
    
      .request()
      .input("courseCode", sql.NVarChar, course.courseCode)
      .input("courseName", sql.NVarChar, course.courseName)
      .input("courseDescription", sql.NVarChar, course.courseDescription)
      .input("courseFees", sql.Int, course.courseFees)
      .input("courseId", sql.Int, courseId)
      .query(`
        UPDATE courses
        SET course_code = @courseCode, course_name = @courseName, course_description = @courseDescription, course_fees = @courseFees
        WHERE course_id = @courseId
      `);

    console.log("Course updated successfully:", result);
  } catch (err) {
    console.error("Error updating course:", err);
    throw err;
  }
},


  // Function to delete a course
  deleteCourse: async function (courseId) {
    try {
      const result = await pool
        .request()
        .input("courseId", sql.Int, courseId)
        .query("DELETE FROM courses WHERE course_id = @courseId");

      console.log("Course deleted successfully:", result);
    } catch (err) {
      console.error("Error deleting course:", err);
      throw err;
    }
  },

   // Function to add a new course
   addCourse: async function (course) {
    try {
      const result = await pool
        .request()
        .input("courseCode", sql.VarChar(100), course.courseCode)
        .input("courseName", sql.VarChar(100), course.courseName)
        .input("courseDescription", sql.VarChar(5000), course.courseDescription)
        .input("courseFees", sql.Money, course.courseFees)
        .query(`
          INSERT INTO courses (course_code, course_name, course_description, course_fees)
          VALUES (@courseCode, @courseName, @courseDescription, @courseFees)
        `);

      console.log("Course added successfully:", result);
    } catch (err) {
      console.error("Error adding course:", err);
      throw err;
    }
  },

// Function to register a student in the database
async registerStudent(student) {
  try {
    const result = await pool
      .request()
      .input("firstName", sql.NVarChar, student.firstName)
      .input("lastName", sql.NVarChar, student.lastName)
      .input("email", sql.NVarChar, student.email)
      .input("phone", sql.NVarChar, student.phone)
      .input("dob", sql.Date, new Date(student.dob))
      .input("program", sql.NVarChar, student.program)
      .input("username", sql.NVarChar, student.username)
      .input("password", sql.NVarChar, student.password).query(`
        INSERT INTO students
        (firstName, lastName, email, phone, dob, department, program, username, password)
        VALUES
        (@firstName, @lastName, @email, @phone, @dob, 'SD Department', @program, @username, @password)
      `);
      console.log("Student registered successfully:", result);
    } catch (err) {
      console.error("Error registering student:", err);
      throw err;
    }
  },


  // Function to export the pool object
  getPool: () => pool,
};
