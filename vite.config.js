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
		port: 5175,
	},
	build: {
		minify: 'terser', // Ensures Terser is used for minification
		terserOptions: {
			compress: {
				drop_console: true, // Removes console logs from production build
				drop_debugger: true, // Removes debugger statements
			},
		},
		sourcemap: false,
		target: 'esnext',
	},
})
