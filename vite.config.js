import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom', // or 'happy-dom'
    globals: true,
    css: true,
    setupFiles: ['./src/tests/setup.js'], // Add this line
  },
})
