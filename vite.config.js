import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// usar base para netlify y para express quitarlo
	// base: './',
	// build: {
	// 	outDir: './docs',
	// },
});
