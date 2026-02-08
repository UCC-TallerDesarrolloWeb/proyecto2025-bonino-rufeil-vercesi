import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// ===== Fix para __dirname en ES Modules (Vite) =====
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// ==================================================

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@js': path.resolve(__dirname, 'src/javascript'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
})
