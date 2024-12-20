import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
	plugins: [
		react(),
		nodePolyfills({
			protocolImports: true,
		}),
	],

	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		https: {
			key: './smart-restaurant-privateKey.key',
			cert: './smart-restaurant.crt',
		},
		port: 5175,
	},
	build: {
		minify: 'terser', // Ensures Terser is used for minification
		terserOptions: {
			compress: {
				drop_console: true, // Removes console logs from production build
				drop_debugger: true, // Removes debugger statements
				unused: true,
			},
			mangle: true,
			output: {
				comments: false,
			},
		},

		sourcemap: false,
		target: 'esnext',
	},
})
