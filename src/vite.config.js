// vite.config.js (at root or inside src/public/)
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  root: 'src/public',
  base: './',
  plugins: [vue()],
  build: {
    outDir: path.resolve(__dirname, 'src/public/dist'),
    emptyOutDir: true,
  }
})
