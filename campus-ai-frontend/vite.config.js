import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets load reliably on Vercel, GitHub Pages, or any domain
  server: {
    host: true, // Listen on all network addresses (0.0.0.0) so phone can access on local Wi-Fi
    port: 5173,
    allowedHosts: true, // Allow all hosts (including Cloudflare Tunnel)
    proxy: {
      '/api/chat': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, '/chat'),
      },
      '/chat': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/api/quiz': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/quiz/, '/quiz'),
      },
      '/api/code': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/code/, '/code'),
      },
      '/api/studyplan': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/studyplan/, '/studyplan'),
      },
    },
  },
})
