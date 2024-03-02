import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearchChange }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const startSearch = (event) => {
		event.preventDefault();
		onSearchChange(searchTerm);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' && searchTerm !== '') {
			startSearch(event);
		}
	};

	const clearSearch = (event) => {
		event.preventDefault();
		setSearchTerm('');
		onSearchChange('');
	}

	return (
		<form>
			<input
				type="text"
				placeholder="Search"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				onKeyDown={handleKeyPress}
			/>
			<button className="start-search" onClick={clearSearch}>✕</button>
			<button className="start-search" onClick={startSearch}>
				<img src="https://cdn-icons-png.flaticon.com/512/54/54481.png" alt="Search" />
			</button>
		</form>
	);
};

export default SearchBar;
