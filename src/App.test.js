import { render, screen } from '@testing-library/react';
import App from './App';

test('renders News Aggregator heading', () => {
	render(<App />);
	const headingElement = screen.getByRole('heading', { name: /News Aggregator/i });
	expect(headingElement).toBeInTheDocument();
});
