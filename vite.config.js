import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  tets: {
    globals: true,
    environment: 'jsdom',
    setupFiles: '/src/test/setup.js',
    css: false,
  },
});
