import React, { useState } from 'react';
import StudentLogin from '../Components/StudentLogin';

const StudentDashboardPage = () => {
  const [loggedIn, setLoggedIn] = useState(false); // Initially not logged in

  // Simulated student information
  const studentInfo = {
    firstName: 'John',
    lastName: 'Doe',
    studentId: '12345',
    // Add more student information as needed
  };

  const handleLogin = () => {
    // Simulated login (e.g., you can perform validation here)
    setLoggedIn(true);
  };

  return (
    <div>
     

      {!loggedIn ? (
        // If not logged in, show the login form
        <div>
          
          <StudentLogin />
          <form>
      
          </form>
        </div>
      ) : (
        // If logged in, display student information
        <div>
           <h2>Student Dashboard Page</h2>
          <h3>Welcome, {studentInfo.firstName}!</h3>
          <p>Student ID: {studentInfo.studentId}</p>
          {/* Display other student information here */}
        </div>
      )}
    </div>
  );
};

export default StudentDashboardPage;
