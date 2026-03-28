import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./__tests__/setup.js'],
    include: ['__tests__/unit/**/*.test.{js,jsx}', '__tests__/integration/**/*.test.{js,jsx}'],
    globals: true,
    css: false,
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
