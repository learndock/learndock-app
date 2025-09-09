import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: '../src/main/resources/static/',
    emptyOutDir: true,
  },
  server: {
      port: 7464,
      allowedHosts: ["perch-brief-gazelle.ngrok-free.app"],
      proxy: {
        '/api': {
          target: 'http://localhost:7465',
          changeOrigin: true,
          secure: false,
        }
      }
    }
})
