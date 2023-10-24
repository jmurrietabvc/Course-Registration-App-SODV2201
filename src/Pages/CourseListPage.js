import React, { useState } from 'react';
import CourseList from '../Components/CourseList';
import CourseSearch from '../Components/CourseSearch';

const CourseListPage = () => {
  return (
    <div>
         <CourseSearch />
      <CourseList />
     
     
    </div>
  );
}

export default CourseListPage;
