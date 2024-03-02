import React from 'react';

const Navbar = ({context, toggleFilter}) => {
	return (
		<header className="header">
			<div className="container">
				<section>
					{toggleFilter}
					<h1>News Aggregator</h1>
				</section>
				{context}
			</div>
		</header>
	);
};

export default Navbar;
