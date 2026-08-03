import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../resources/static/',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8080', // Connects directly to Spring Boot
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
