module.exports = {
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
	},
  testMatch: ["<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}", "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^lodash-es$": "lodash"
	},
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
	moduleDirectories: ['node_modules', 'src'],
};