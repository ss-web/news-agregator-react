import { NEWS_API, GUARD_API, NY_API, UNICAL_KEY } from '../constants';

const getResult = async (link, data, source) => {
	try {
		const response = await fetch(link, { credentials: 'include' });
		if (!response.ok) {
			throw new Error(`Failed to fetch data from ${link}: ${response.status} ${response.statusText}`);
		}
		const responseData = await response.json();
		const keys = data.split('.');
		let result = responseData;

		for (const key of keys) {
			result = result && result[key];
		}

		return (result || []).map(e => ({[UNICAL_KEY]: source, ...e}));
	} catch (error) {
		throw error;
	}
}

const apiParamMappings = {
  [NEWS_API]: {
    search: (value) => `q=${encodeURIComponent(value)}`,
    category: (value) => `category=${encodeURIComponent(value)}`,
    date: (value) => `from=${encodeURIComponent(value)}`,
    author: (value) => `domains=${encodeURIComponent(value)}`,
  },
  [GUARD_API]: {
    search: (value) => `q=${encodeURIComponent(value)}`,
    category: (value) => `section=${encodeURIComponent(value)}`,
    date: (value) => `from-date=${encodeURIComponent(value)}`,
    author: (value) => `contributor=${encodeURIComponent(value)}`,
  },
  [NY_API]: {
    search: (value) => `q=${encodeURIComponent(value)}`,
    category: (value) => `fq=news_desk:("${encodeURIComponent(value)}")`,
    date: (value) => `begin_date=${encodeURIComponent(value)}`,
    author: (value) => `fq=byline:("${encodeURIComponent(value)}")`,
  },
};

const buildSearchUrl = (baseUrl, options, api) => {
  let url = baseUrl;

  for (const key in options) {
    if (options[key]) {
      const paramMapping = apiParamMappings[api][key];
      if (paramMapping) {
        url += `&${paramMapping(options[key])}`;
      }
    }
  }

  return url;
};

const ApiService = {
	// Documentation: https://newsapi.org/
	getNewsAPIArticles: async ({ search, category, date, author }) => {
		let baseUrl = `https://newsapi.org/v2/top-headlines?apiKey=${process.env.REACT_APP_NEWSAPI_KEY}&country=us`;
		if (search) {
			baseUrl = `https://newsapi.org/v2/everything?apiKey=${process.env.REACT_APP_NEWSAPI_KEY}&sortBy=publishedAt`;
		}

		const url = buildSearchUrl(baseUrl, search ? { search, date } : { category, author }, NEWS_API);
		return await getResult(url, 'articles', NEWS_API);
	},

	// Documentation: https://open-platform.theguardian.com/documentation/
	getGuardianapisArticles: async ({search, category, date, author}) => {		
		const url = `https://content.guardianapis.com/search?api-key=${process.env.REACT_APP_GURDIANAPIS_KEY}&q=news`;
		const urlWithParams = buildSearchUrl(url, { search, category, date, author }, GUARD_API);
		return await getResult(urlWithParams, 'response.results', GUARD_API);
	},

  // Documentation: https://developer.nytimes.com/apis
	getNYTArticles: async ({ search, category, date, author }) => {
		const isNotMain = search || category || date || author;
		const baseUrl = isNotMain
			? `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.REACT_APP_NYTIMESAPI_KEY}`
			: `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_NYTIMESAPI_KEY}`;
	
		const urlWithParams = buildSearchUrl(baseUrl, { search, category, date, author }, NY_API);
		return await getResult(urlWithParams, isNotMain ? 'response.docs' : 'results', NY_API);
	}
};

export default ApiService;
