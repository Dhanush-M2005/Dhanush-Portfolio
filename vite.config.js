// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // 👈 This makes paths relative so your site works locally and on Netlify
  plugins: [react()],
});