export function generateRandomWord(number) {
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	let randomWord = '';

	for (let i = 0; i < number; i++) {
		const randomIndex = Math.floor(Math.random() * alphabet.length);
		randomWord += alphabet[randomIndex];
	}

	return randomWord;
}

export function debounce(func, delay) {
	let timeoutId;

	return function (...args) {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};
}