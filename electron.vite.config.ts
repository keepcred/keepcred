import { defineConfig } from 'electron-vite'
import reactSwc from '@vitejs/plugin-react-swc'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  main: {
    build: {
      minify: 'terser'
    },
    plugins: [viteTsconfigPaths()],
  },
  preload: {
    build: {
      minify: 'terser'
    },
    plugins: [viteTsconfigPaths()],
  },
  renderer: {
    build: {
      minify: 'terser'
    },
    plugins: [reactSwc(), viteTsconfigPaths()],
  },
})
