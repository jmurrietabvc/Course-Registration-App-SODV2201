import React, { useState } from 'react';
import StudentLogin from '../Components/StudentLogin';
import { Studentdashboard } from '../Components/StudentDashboard';

const StudentDashboardPage = () => {
  // Assuming you have some way to manage the user's login state.
  // For this example, we'll use a simple boolean value.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <Studentdashboard />
      ) : (
        <StudentLogin onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export default StudentDashboardPage;
