const sql = require('mssql');
 
// Connection configuration
const config = {
  user: 'Admin123',
  password: 'Admin123',
  server: 'localhost',
  database: 'cr',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};
 
// Create a pool object
const pool = new sql.ConnectionPool(config);

module.exports = {
// Function to connect to the database
async connectToDatabase() {
  try {
    await pool.connect();
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}
,

// Function to show programs table
async showPrograms() {
  try {
    const result = await pool.request().query('SELECT * FROM programs');
    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    console.error('Error querying the database:', err);
  }
}
,

// Function to show courses table
async showCourses() {
  try {
    const result = await pool.request().query('SELECT * FROM courses');
    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    console.error('Error querying the database:', err);
  }
}
,
};
