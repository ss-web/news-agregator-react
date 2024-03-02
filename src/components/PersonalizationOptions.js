import React, { useRef, useState, useEffect } from 'react';
import { ALL_SOURCES, CATEGORIES } from '../constants';

const AUTHORS = [
  'www.wsj.com', 'techcrunch.com'
]

const PersonalizationOptions = ({ onPersonalizationChange }) => {
  const initialRender = useRef(true);
  const [selectedSources, setSelectedSources] = useState([...ALL_SOURCES]);
  const [selectedCategories, setSelectedCategories] = useState([...CATEGORIES]);
  const [selectedAuthor, setSelectedAuthor] = useState('');

  const handleSourceChange = (value) => {
    setSelectedSources((prevSelectedSources) => {
      if (prevSelectedSources.includes(value)) {
        return prevSelectedSources.filter((source) => source !== value);
      } else {
        return [...prevSelectedSources, value];
      }
    });
  };

  const handleCategoryChange = (value) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(value)) {
        return prevSelectedCategories.filter((category) => category !== value);
      } else {
        return [...prevSelectedCategories, value];
      }
    });
  };

  const handleAuthorChange = (value) => {
    setSelectedAuthor(value);
  };

  useEffect(() => {
    if (!initialRender.current) {
      onPersonalizationChange({
        selectedSources,
        selectedCategories,
        selectedAuthor
      });
    } else {
      initialRender.current = false;
    }
  }, [selectedSources, selectedCategories, selectedAuthor, onPersonalizationChange]);

  return (
    <div className="filters">
      <h2>Personalization Options</h2>
      <div className="filters-block">
        Select Sources:
        {ALL_SOURCES.map((source) => (
          <div key={'source_' + source}>
            <input
              id={'source_' + source}
              type="checkbox"
              value={source}
              checked={selectedSources.includes(source)}
              onChange={() => handleSourceChange(source)}
            />
            <label htmlFor={'source_' + source} className="checkbox-label">{source}</label>
          </div>
        ))}
      </div>

      <div className="filters-block">
        Select Categories:
        {CATEGORIES.map((category) => (
          <div key={'category_' + category}>
            <input
              id={'category_' + category}
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={'category_' + category} className="checkbox-label">{category}</label>
          </div>
        ))}
      </div>
      <div className="filters-block">
        Select Authors:
        <div>
          <input
            id="author_all"
            type="radio"
            value=""
            checked={!selectedAuthor}
            onChange={() => setSelectedAuthor('')}
          />
          <label htmlFor="author_all" className="checkbox-label">All authors</label>
        </div>
        <span>Read only:</span>
        {AUTHORS.map((author) => (
          <div key={'author_' + author}>
            <input
              id={'author_' + author}
              type="radio"
              value={author}
              checked={selectedAuthor === author}
              onChange={() => handleAuthorChange(author)}
            />
            <label htmlFor={'author_' + author} className="checkbox-label">{author}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizationOptions;
