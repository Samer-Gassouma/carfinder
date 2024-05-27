import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    // You'll need to implement filtering logic here based on searchTerm
    // Example: filter cars in CarList based on searchTerm
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for cars..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;