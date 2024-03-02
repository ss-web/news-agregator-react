import React from 'react';

const ErrorMessage = ({ message }) => {
	return (
		<div style={{ color: 'red', margin: '10px 0', padding: '10px', border: '1px solid red' }}>
			<strong>Error:</strong> {message}
		</div>
	);
};

export default ErrorMessage;