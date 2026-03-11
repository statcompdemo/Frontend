import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/ct/' : '/',
  server: {
    open: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
}))
