import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/courselist.css";

function CourseSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5544/courses?search=${searchTerm}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching for courses:", error);
      }
    };

    // Delay the search by 300 milliseconds to avoid rapid requests while typing
    const searchTimeout = setTimeout(handleSearch, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchTerm]);

  return (
    <div>
      <hr />
      <h3>Search for a Course &emsp;
        <input
          type="text"
          placeholder="Search by name or code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </h3>
      <hr />
      <ul>
        {searchResults.map((course) => (
          <li key={course.course_id}>
            <h3>Search Result</h3>
            {course.course_name} ({course.course_code}) - {course.course_description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseSearch;
