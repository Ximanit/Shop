import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [vue()],
	server: {
		port: 5173,
		proxy: {
			'/api': 'https://shop-nyf7.onrender.com',
		},
	},
});
