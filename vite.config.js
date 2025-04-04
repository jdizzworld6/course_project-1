import React from 'react'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // test: {
  //   environment: 'jsdom', // or 'happy-dom'
  //   globals: true,
  //   css: true,
  //   setupFiles: ['./src/tests/setup.js'], // Add this line
  // },
  plugins: [react()]
})
