import React, { useState, useEffect, useCallback } from 'react';
import './App.css'
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FilterOptions from './components/FilterOptions';
import PersonalizationOptions from './components/PersonalizationOptions';
import ArticleList from './components/ArticleList';
import Api from './services/ApiService';
import { debounce } from './utils';
import { NEWS_API, GUARD_API, NY_API, UNICAL_KEY, DEFAULT_PERSONAL } from './constants';

const App = () => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [filters, setFilters] = useState([]);
	const [personal, setPersonal] = useState(DEFAULT_PERSONAL);
	const [filterVisible, setFilterVisible] = useState(false);
	const [search, setSearch] = useState('');

	const fetchNews = async () => {
		const apiPromises = [];
		const date = filters.selectedDate;
		const category = filters.selectedCategory;
		const author = personal.selectedAuthor;
		const queryParams = {search, category, date, author};

		if (personal.selectedSources.includes(NEWS_API)) {
			apiPromises.push(Api.getNewsAPIArticles(queryParams));
		}
		if (personal.selectedSources.includes(GUARD_API)) {
			apiPromises.push(Api.getGuardianapisArticles(queryParams));
		}
		if (personal.selectedSources.includes(NY_API)) {
			apiPromises.push(Api.getNYTArticles(queryParams));
		}

		try {
			const allArticles = await Promise.all(apiPromises);
			const shuffledArticles = await allArticles.flat().filter((e) => {
				if (filters.selectedSource === e[UNICAL_KEY]) {
					return e;
				}
				if (!filters.selectedSource) {
					return e;
				}
			}).map((a) => ({ sort: Math.random(), value: a }))
				.sort((a, b) => a.sort - b.sort)
				.map((a) => a.value);
			setArticles(shuffledArticles);
			setLoading(false);
			setError(null);
		} catch (error) {
			console.error('Error fetching news:', error);
			setError('Error fetching news. Please try again later.');
			setLoading(false);
		}
	};

	const debouncedFetchNews = debounce(() => fetchNews(), 1000);

	const handleSearchChange = useCallback((newSearch) => {
		if (search !== newSearch) {
			setSearch(newSearch)
		}
	}, [search]);

	const handleFilterChange = useCallback((newFilterOptions) => {
		if (JSON.stringify(filters) !== JSON.stringify(newFilterOptions)) {
			setFilters(newFilterOptions);
		}
	}, [filters]);
	
	const handlepersonalizationChange = useCallback((newpersonalizedOptions) => {
		if (JSON.stringify(newpersonalizedOptions) !== JSON.stringify(personal)) {
			setPersonal(newpersonalizedOptions);
		}
	}, [personal]);

	useEffect(() => {
		debouncedFetchNews();
	}, [filters, personal, search, handleFilterChange, handleSearchChange, handlepersonalizationChange]); 

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Some error...</div>;
	}

	return (
		<div className="App">
			<Navbar
				toggleFilter={<button className="show-menu" onClick={() => setFilterVisible(!filterVisible)}>Toggle Filter</button>}
				context={<SearchBar onSearchChange={handleSearchChange} />}
			/>
			<main>
				<aside className={filterVisible ? 'show' : ''}>
					<FilterOptions
						onFilterChange={handleFilterChange}
						sources={personal.selectedSources}
						categories={personal.selectedCategories}
					/>
					<PersonalizationOptions onPersonalizationChange={handlepersonalizationChange} />
				</aside>
				<ArticleList articles={articles} />
			</main>
			<Footer />
		</div>
	);
};

export default App;

