import React, { useState } from 'react';
import CourseList from '../Components/CourseList';
import CourseSearch from '../Components/CourseSearch';

const CourseListPage = () => {
  return (
    <div className="courselistpage">
      <h2>Course List</h2>
          <CourseList /> 
    </div>
  );
}

export default CourseListPage;
