import React from 'react';

const BylineModel = {
	original: '',
	person: [],
	organization: [],
};

const NYtimesCard = ({ article }) => {
	const { title, headline, abstract, byline = BylineModel } = article;

	return (
		<>
			<h2>{title || headline.main || ''}</h2>
			<p>
				{abstract || ''}<br />
				<strong>{byline.original}</strong>
			</p>
		</>
	);
};

export default NYtimesCard;