import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  cacheDir: 'cache',
  optimizeDeps: {
    // Explicitly pre-bundle React and related libraries to avoid runtime ESM default export issues
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'framer-motion',
      'react-icons',
    ],
  },
  server: {
    // Run Vite on port 5174 to match your opened browser URL and ensure HMR websocket connects
    port: 5174,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5174,
    },
  },
})
