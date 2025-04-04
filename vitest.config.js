
// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom', // or 'happy-dom'
        globals: true, // Allows use of describe, it, expect without importing
    },
});