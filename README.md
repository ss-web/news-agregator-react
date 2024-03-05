# News Aggregator App

![News Aggregator App](https://ss-web.ru/assets/images/tz-agregator.png)

This is a simple React-based news aggregator app that fetches news articles from different APIs and displays them based on user preferences.

## Features

- Fetches news articles from News API, The Guardian API, and The New York Times API.
- Allows users to filter news by category, date, and author.
- Personalization options to choose news sources and categories.
- Debounced search functionality for a smooth user experience.
- Responsive design for different screen sizes.

## Technologies Used

- React
- CSS (styled with CSS modules)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/news-aggregator-app.git
cd news-aggregator-app
```
Install dependencies:
		
```bash
npm install
```
Create a .env file in the root directory and add your API keys:

```env
REACT_APP_NEWSAPI_KEY=your-news-api-key
REACT_APP_GUARDIANAPI_KEY=your-guardian-api-key
REACT_APP_NYTIMESAPI_KEY=your-nytimes-api-key
```

Run the app:

```bash
npm start
```
Open your browser and go to http://localhost:3000 to view the app.

Feel free to contribute to this project by opening issues or pull requests.

<!-- This project is licensed under the MIT License - see the LICENSE file for details. -->
