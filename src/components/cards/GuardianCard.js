import React from 'react';

const GuardianCard = ({ article }) => {
	return (
		<>
			<h2>{article.webTitle}</h2>
			<p>{article.description}<br />{article.author}</p>
		</>
	);
};

export default GuardianCard;