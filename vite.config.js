import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'
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
		sourcemap: false,
		minify: 'esbuild',
		target: 'esnext',
	},
	esbuild: {
		sourcemap: false,
	},
})
