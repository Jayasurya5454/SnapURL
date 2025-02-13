import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Bind to 0.0.0.0 to allow external connections
    port: 10000,     // Specify a port (e.g., 10000, which Render looks for)
  },
})
