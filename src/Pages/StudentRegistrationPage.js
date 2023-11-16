import React from 'react';
import StudentRegistrationForm from '../Components/RegistrationForm';

const StudentRegistrationPage = () => {
    const handleRegistration = (newStudent) => {
        // Implement your registration logic here
        // This is where you can store the new student data or make API requests
        console.log('New student data:', newStudent);
      };
    
      return (
        <div>
          {/* <h1>Registration Page</h1> */}
          <StudentRegistrationForm onRegister={handleRegistration} />
        </div>
      );
}

export default StudentRegistrationPage;
