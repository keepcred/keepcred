import { defineConfig } from 'electron-vite'
import reactSwc from '@vitejs/plugin-react-swc'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  main: {
    plugins: [viteTsconfigPaths()],
  },
  preload: {
    plugins: [viteTsconfigPaths()],
  },
  renderer: {
    plugins: [reactSwc(), viteTsconfigPaths()],
  },
})
