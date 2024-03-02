import React from 'react';

const NewsAPICard = ({ article }) => {
	return (
		<>
			{article?.urlToImage && <img src={article?.urlToImage} width={100} />}
			<h2>{article.title}</h2>
			<p>{article.description}<br />{article.author}</p>
		</>
	);
};

export default NewsAPICard;
