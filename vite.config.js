import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/v1': 'https://ecommerce-backend-r1lo.onrender.com'
      }
  },
  plugins: [react()],
})
