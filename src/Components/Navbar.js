import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/student/registration">New Student Registration</Link>
          </li>

          <li>
            <Link to="/student/login">Student Portal</Link>
          </li>

          <li>
            <Link to="/course/list">Course List</Link>
          </li>

          <li className="admin-button">
            <Link to="/admin/login">Admin</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
