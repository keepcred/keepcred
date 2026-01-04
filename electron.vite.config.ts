import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  main: {
    plugins: [viteTsconfigPaths()],
  },
  preload: {
    plugins: [viteTsconfigPaths()],
  },
  renderer: {
    plugins: [react(), viteTsconfigPaths()],
  },
})
