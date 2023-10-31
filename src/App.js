import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import StudentDashboardPage from './Pages/StudentDashboardPage';
import AdminLoginPage from './Pages/AdminLoginPage';
import StudentLoginPage from './Pages/StudentLoginPage';
import StudentRegistrationPage from './Pages/StudentRegistrationPage';
import CourseListPage from './Pages/CourseListPage';
import CourseRegistrationPage from './Pages/CourseRegistrationPage';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student/dashboard" element={<StudentDashboardPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/student/login" element={<StudentLoginPage />} />
        <Route path="/student/registration" element={<StudentRegistrationPage />} />
        <Route path="/course/list" element={<CourseListPage />} />
        <Route path="/course/registration" element={<CourseRegistrationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
