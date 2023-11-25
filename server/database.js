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
  connectToDatabase: async function() {
    try {
      await pool.connect();
      console.log("Connected to the database");
    } catch (err) {
      console.error("Error connecting to the database:", err);
    }
  },
  // Function to show programs table
  showPrograms: async function() {
    try {
      const result = await pool.request().query("SELECT * FROM programs");
      console.log(result.recordset);
      return result.recordset;
    } catch (err) {
      console.error("Error querying the database:", err);
    }
  },
  // Function to show courses table
  showCourses: async function() {
    try {
      const result = await pool.request().query("SELECT * FROM courses");
      console.log(result.recordset);
      return result.recordset;
    } catch (err) {
      console.error("Error querying the database:", err);
    }
  },
  // Function to register a student in the database
  registerStudent: async function(student) {
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

  getCoursesFromDatabase: async function() {
    try {
      await pool.connect();

      const result = await pool.request().query("SELECT * FROM courses");

      return result.recordset;
    } catch (error) {
      console.error('Error fetching courses from MSSQL database:', error);
      throw error;
    } finally {
      // Be sure to close the connection when you're done with it
      await pool.close();
    }
  },

  //to export the pool object
  getPool: () => pool,
};
