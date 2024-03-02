import React, { useRef, useState, useEffect } from 'react';
import { ALL_SOURCES, CATEGORIES } from '../constants';

const FilterOptions = ({ onFilterChange, sources = ALL_SOURCES, categories = CATEGORIES }) => {
  const initialRender = useRef(true);
  const [filters, setFilters] = useState({
    selectedDate: '',
    selectedCategory: '',
    selectedSource: ''
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleClearDate = () => {
    setFilters(prevFilters => ({
      ...prevFilters,
      selectedDate: ''
    }));
  };

  useEffect(() => {
    if (!initialRender.current) {
      onFilterChange(filters);
    } else {
      initialRender.current = false;
    }
  }, [filters, onFilterChange]);

  return (
    <div className="filters">
      <h2>Filter Options</h2>
      <div className="filters-block">
        <label>
          <span className="filters-block--name">Date (from):</span>
          <input
            type="date"
            name="selectedDate"
            value={filters.selectedDate}
            onChange={handleFilterChange}
          />
          {filters.selectedDate && <button className="filters-block--clear" onClick={handleClearDate}>✕</button>}
        </label>
      </div>
      <div className="filters-block">
        <label>
          <span className="filters-block--name">Category:</span>
          <select
            name="selectedCategory"
            value={filters.selectedCategory}
            onChange={handleFilterChange}
          >
            <option value="">Select Category</option>
            {categories.map((source, index) => (
              <option key={index} value={source}>{source}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="filters-block">
        <label>
          <span className="filters-block--name">Source:</span>
          <select
            name="selectedSource"
            value={filters.selectedSource}
            onChange={handleFilterChange}
          >
            <option value="">Select Source</option>
            {sources.map((source, index) => (
              <option key={index} value={source}>{source}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default FilterOptions;
