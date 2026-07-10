/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // e2e/ belongs to Playwright; vitest only runs unit tests under src/
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
