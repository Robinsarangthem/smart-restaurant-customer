export default {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
	},
	'@fullhuman/postcss-purgecss': {
		content: ['./src/**/*.{html,js,jsx,ts,tsx}'], // Paths to scan for CSS usage
		defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
	},
}
