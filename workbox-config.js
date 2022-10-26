module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{css,js,json,jpg,ico,woff2,png,svg,html,txt}'
	],
	swDest: 'dist/sw.js',

	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};