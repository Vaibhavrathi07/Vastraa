import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const Search = ({ onSearch, isLoading, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <div className="flex items-center bg-white rounded-md shadow-sm ">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search Shirts"
        className="px-4 py-2 w-full rounded-l-md text-gray-800 focus:outline-none"
      />
      
      {query && (
        <button 
          onClick={clearSearch}
          className="px-2 text-gray-500 hover:text-gray-700"
          aria-label="Clear search"
        >
          <FiX />
        </button>
      )}
      
      <button
        onClick={handleSearch}
        disabled={isLoading}
        className={`flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 ${
          isLoading ? 'opacity-75 cursor-not-allowed' : ''
        }`}
        aria-label="Search"
      >
        {isLoading ? (
          <span className="animate-pulse">...</span>
        ) : (
          <FiSearch />
        )}
      </button>
    </div>
  );
};

export default Search;