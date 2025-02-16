import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/patate-mag',
  build: {
    manifest: true,
    sourcemap: true,
    emptyOutDir: true,
  },
  publicDir: 'public',
});
