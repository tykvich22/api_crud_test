import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	base: '/api_crud_test',
	plugins: [react()],
});
