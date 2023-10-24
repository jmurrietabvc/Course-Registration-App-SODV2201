import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="homepage">
      <h2>Welcome to the Course Registration System</h2>
      <p>
        Embark on your educational journey with the Course Registration System. Explore a world of knowledge, choose your path, and unlock new opportunities.
      </p>
      <p>
        Students, you're in control. Discover, register, and manage your courses effortlessly. Let your learning adventure begin.
      </p>
      <p>
        Administrators, we've got you covered too. Seamlessly oversee course management and student registrations with ease.
      </p>
      <p>
        Navigate through the top menu to embark on your academic voyage. Dive into a world of possibilities.
      </p>
      <div className="homepage-buttons">
        <Link to="/student/dashboard">
          <button className="homepage-button">Login as a Student</button>
        </Link>
        <Link to="/course/list">
          <button className="homepage-button">Check Available Courses</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
