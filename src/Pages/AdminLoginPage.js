// AdminLoginPage.js Page
import React, { useState } from 'react';
import AdminLogin from '../Components/AdminLogin';
import AdminDashboard from '../Components/AdminDashboard'; // Import the AdminDashboard component

const AdminLoginPage = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleAdminLogin = () => {
    // This function will be called when the admin successfully logs in
    setIsAdminLoggedIn(true);
  };

  return (
    <div>
      {!isAdminLoggedIn ? (
        <AdminLogin onAdminLogin={handleAdminLogin} />
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
};

export default AdminLoginPage;
