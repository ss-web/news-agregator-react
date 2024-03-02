// NewsAPICard.js
import React from 'react';

const Card = ({ context, source, readMore }) => {
	return (
		<article className="news-card">
			<strong className={`news-card--source ${source}`}>{source}</strong>
			<section className="news-card--context">{context}</section> 
			
			{readMore && <a href={readMore} className="read-more" target="_blank" rel="noopener noreferrer">
				Read more
			</a>}
		</article>
	);
};

export default Card;
