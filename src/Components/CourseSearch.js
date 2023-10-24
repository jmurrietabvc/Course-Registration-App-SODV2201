import React, { useState } from "react";
import courses from "../data";

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
      <h2>Course Search</h2>
      <input
        type="text"
        placeholder="Search by name or code"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((course) => (
          <li key={course.id}>
            {course.name} ({course.code}) - {course.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
