import { defineConfig } from 'vite';
import paths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: './',
  root: './src',
  publicDir: '../public',
  build: {
    emptyOutDir: true,
    outDir: '../dist',
  },
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    paths({ root: '..' }),
    react({ plugins: [] })
  ],
});
