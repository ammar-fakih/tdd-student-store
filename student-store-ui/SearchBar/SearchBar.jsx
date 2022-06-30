import React from 'react';
import './SearchBar.css';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  handleSearch = () => {},
}) {
  return (
    <div className="searchbar-container">
      <input
        placeholder="Search Items"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <button onClick={handleSearch}>
        <span className="material-symbols-outlined">search</span>
      </button>
    </div>
  );
}
