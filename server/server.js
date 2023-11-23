const { registerStudent } = require("./database");

const express = require("express");
const app = express();
const port = 5544;
const cors = require("cors");

// Import the sql object
const sql = require("mssql");

const { connectToDatabase, showPrograms, getPool } = require("./database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

connectToDatabase();
// to get the pool object
const pool = getPool();

app.get("/programs", async (req, res) => {
  const programs = await showPrograms();
  res.json(programs);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

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

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//route to login a student
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query the database to find the user with the provided username and password
    const result = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .input("password", sql.NVarChar, password)
      .query(
        "SELECT * FROM students WHERE username = @username AND password = @password"
      );

    if (result.recordset.length > 0) {
      // Authentication successful
      const student = result.recordset[0];
      res.json({ success: true, student });
    } else {
      // Authentication failed
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
