import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const VENDOR_CHUNKS: Record<string, string[]> = {
  react: ['/node_modules/react/', '/node_modules/react-dom/', '/node_modules/scheduler/'],
  mui: ['/node_modules/@mui/', '/node_modules/@emotion/'],
  motion: ['/node_modules/framer-motion/', '/node_modules/motion-dom/', '/node_modules/motion-utils/'],
  i18n: ['/node_modules/i18next', '/node_modules/react-i18next/'],
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this from /<repo>/. Hosts that serve from the domain
  // root (Netlify, Vercel, Cloudflare Pages) set BASE_PATH=/ instead.
  base: command === 'build' ? (process.env.BASE_PATH ?? '/rocio-leon-portfolio/') : '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const path = id.split('?')[0].replace(/\\/g, '/')
          for (const [chunk, matchers] of Object.entries(VENDOR_CHUNKS)) {
            if (matchers.some((m) => path.includes(m))) return chunk
          }
          return undefined
        },
      },
    },
  },
}))
