import React, { useState } from "react";
import courses from "../data";
import "../css/courselist.css";


export default function CourseSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Implement search functionality and update searchResults
    const results = courses.filter((course) => {
      // Search by name or code (case-insensitive)
      const term = searchTerm.toLowerCase();
      return (
        course.name.toLowerCase().includes(term) ||
        course.code.toLowerCase().includes(term)
      );
    });
    setSearchResults(results);
  };

  return (
    <div>
      <hr/>
      <h3>Search for a Course &emsp;
      <input
        type="text"
        placeholder="Search by name or code"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      &emsp;
      <button onClick={handleSearch}>Search</button>
      </h3>
      <hr/>
      <ul>
        {searchResults.map((course) => (
          <li key={course.id}>
            <h3>Search Result</h3>
            {course.name} ({course.code}) - {course.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
