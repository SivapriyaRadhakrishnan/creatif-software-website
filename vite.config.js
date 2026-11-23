import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        // Long-lived vendor chunks so returning visitors keep them cached.
        // `.` matches either path separator (Windows or POSIX).
        codeSplitting: {
          groups: [
            {
              name: 'react',
              test: /node_modules.(react|react-dom|react-router|react-router-dom|scheduler|cookie|set-cookie-parser)./,
            },
            { name: 'motion', test: /node_modules.(framer-motion|motion-dom|motion-utils)./ },
            { name: 'gsap', test: /node_modules.gsap./ },
            { name: 'icons', test: /node_modules.lucide-react./ },
          ],
        },
      },
    },
  },
})
