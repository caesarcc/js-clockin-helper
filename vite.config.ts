import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/js-clockin-helper/',
  plugins: [react()],
  build: {
    sourcemap: false
  }
})
