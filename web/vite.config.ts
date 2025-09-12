import { appPort } from "./package.json";
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
      port: 7776,
      allowedHosts: ["perch-brief-gazelle.ngrok-free.app"],
      proxy: {
        '/api': {
          target: `http://localhost:${appPort}`,
          changeOrigin: true,
          secure: false,
        }
      }
    }
})
