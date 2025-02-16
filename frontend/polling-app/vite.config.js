import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Make sure it's not conflicting with backend
  },
  build: {
    outDir: 'dist',
  },
  base: '/', // Important for routing
});
