import { generateRandomWord } from './utils'

export const NEWS_API = 'NewsAPI';
export const GUARD_API = 'Guardian';
export const NY_API = 'NYtimes';
export const ALL_SOURCES = [NEWS_API,	GUARD_API, NY_API];
export const CATEGORIES = ['business', 'technology', 'politics'];

export const UNICAL_KEY = generateRandomWord(10);

export const DEFAULT_PERSONAL = {
	selectedSources: ALL_SOURCES,
	selectedCategories: CATEGORIES,
	selectedAuthor: ''
}