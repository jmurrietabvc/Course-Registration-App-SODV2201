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
      const result = await pool.request().query("SELECT * FROM program");
      console.log(result.recordset);
      return result.recordset;
    } catch (err) {
      console.error("Error querying the database:", err);
    }
  },

  // Function to get program by name
  getProgramByName: async function (programName) {
    try {
      const result = await pool
        .request()
        .input("programName", sql.NVarChar, programName)
        .query("SELECT * FROM program WHERE program_name = @programName");

      if (result.rowsAffected[0] === 1) {
        console.log("Program retrieved successfully:", result);
        return result.recordset;
      }
    } catch (err) {
      console.error("Error retrieving program:", err);
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
      console.log("Updating course with the following data:");
      console.log("courseCode:", course.courseCode);
      console.log("courseName:", course.courseName);
      console.log("courseDescription:", course.courseDescription);
      console.log("courseFees:", course.courseFees);
      console.log("courseId:", courseId);

      const result = await pool

        .request()
        .input("courseCode", sql.NVarChar, course.courseCode)
        .input("courseName", sql.NVarChar, course.courseName)
        .input("courseDescription", sql.NVarChar, course.courseDescription)
        .input("courseFees", sql.Int, course.courseFees)
        .input("courseId", sql.Int, courseId).query(`
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

  // Function to add a new course
  addCourse: async function (course) {
    try {
      // Use the nextCourseId when inserting the new course
      const result = await pool
        .request()
        .input("courseCode", sql.VarChar(100), course.courseCode)
        .input("courseName", sql.VarChar(100), course.courseName)
        .input("courseDescription", sql.VarChar(5000), course.courseDescription)
        .input("courseFees", sql.Money, course.courseFees).query(`
        INSERT INTO courses (course_code, course_name, course_description, course_fees)
        VALUES (@courseCode, @courseName, @courseDescription, @courseFees)
      `);

      console.log("Course added successfully:", result);
    } catch (err) {
      console.error("Error adding course:", err);
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

  // Function to register a student in the database
  async registerStudent(student) {
    try {
      const result = await pool
        .request()
        .input("student_firstName", sql.NVarChar, student.student_firstName)
        .input("student_lastName", sql.NVarChar, student.student_lastName)
        .input("email", sql.NVarChar, student.email)
        .input("phone", sql.NVarChar, student.phone)
        .input("dob", sql.Date, new Date(student.dob))
        .input("department", sql.NVarChar, student.department) // Added department input
        .input("program_id", sql.Int, student.program_id)
        .input("username", sql.NVarChar, student.username)
        .input("password", sql.NVarChar, student.password).query(`
      INSERT INTO student
      (student_firstName, student_lastName, email, phone, dob, department, program_id, username, password)
      VALUES
      (@student_firstName, @student_lastName, @email, @phone, @dob, @department, @program_id, @username, @password)
    `);
      console.log("Student registered successfully:", result);
    } catch (err) {
      console.error("Error registering student:", err);
      throw err;
    }
  },
  
  // Function to login a student
  loginStudent: async function (username, password) {
    try {
      const result = await pool
        .request()
        .input("username", sql.NVarChar, username)
        .input("password", sql.NVarChar, password)
        .query(`
          SELECT * FROM student
          WHERE username = @username AND password = @password
        `);
  
      if (result.rowsAffected[0] === 1) {
        const user = result.recordset[0];
        // Omit the password from the returned user object
        const { password, ...userWithoutPassword } = user;
        console.log("Student logged in successfully:", userWithoutPassword);
        return userWithoutPassword;
      }
    } catch (err) {
      console.error("Error logging in student:", err);
    }
  },
  getDetailedStudent: async function (username) {
    try {
      const result = await pool
        .request()
        .input("username", sql.NVarChar, username)
        .query(`
          SELECT * FROM student
          WHERE username = @username
        `);

      if (result.rowsAffected[0] === 1) {
        delete result.recordset[0].password;
        console.log("Detailed student information retrieved successfully:", result);
        return result.recordset[0];
      } else {
        console.log("Error fetching detailed student information. Student not found.");
        return null;
      }
    } catch (error) {
      console.error("Reason why is not working", error);
      
    }
  },

// Function to enroll a student in a course
 enrollStudentInCourse: async function(studentId, courseId) {
  try {
    const result = await pool
      .request()
      .input("studentId", sql.Int, studentId)
      .input("courseId", sql.Int, courseId)
      .query(`
        INSERT INTO courses_student (student_id, course_id)
        VALUES (@studentId, @courseId)
      `);
    console.log("Student enrolled in course successfully:", result);
  } catch (err) {
    console.error("Error enrolling student in course:", err);
    throw err;
  }
},

// Function to withdraw a student from a course
withdrawStudentFromCourse: async function(studentId, courseId) {
  try {
    const result = await pool
      .request()
      .input("studentId", sql.Int, studentId)
      .input("courseId", sql.Int, courseId)
      .query(`
        DELETE FROM courses_student
        WHERE student_id = @studentId AND course_id = @courseId
      `);
    console.log("Student withdrawn from course successfully:", result);
  } catch (err) {
    console.error("Error withdrawing student from course:", err);
    throw err;
  }
},

// Function to get enrolled courses for a student
getEnrolledCourses: async function (studentId) {
  try {
    const result = await pool
      .request()
      .input("studentId", sql.Int, studentId)
      .query(`
        SELECT courses.*
        FROM courses
        JOIN courses_student ON courses.course_id = courses_student.course_id
        WHERE courses_student.student_id = @studentId
      `);

    const enrolledCourses = result.recordset;
    return enrolledCourses;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    throw error;
  }
},


  // Function to export the pool object
  getPool: () => pool,
};
