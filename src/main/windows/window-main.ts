import { join } from 'path'

import { app, BrowserWindow, shell } from 'electron'
import { is } from '@electron-toolkit/utils'
import { createIPCHandler } from 'trpc-electron/main'

import { ENV } from '../env'
import { routerTRpc } from '../routers'

/**
 * Основное окно приложения
 */
const WINDOW_MAIN = new BrowserWindow({
  width: ENV.VITE_ELECTRON_WINDOW_DEFAULT_WIDTH,
  height: ENV.VITE_ELECTRON_WINDOW_DEFAULT_HEIGHT,
  minWidth: ENV.VITE_ELECTRON_WINDOW_MIN_WIDTH,
  minHeight: ENV.VITE_ELECTRON_WINDOW_MIN_HEIGHT,
  show: false,
  center: true,
  autoHideMenuBar: true,
  webPreferences: {
    preload: join(__dirname, '../preload/index.js'),
    sandbox: false,
  },
})

createIPCHandler({
  router: routerTRpc,
  windows: [WINDOW_MAIN],
})

WINDOW_MAIN.on('closed', () => {
  app.quit()
})

WINDOW_MAIN.on('ready-to-show', () => {
  WINDOW_MAIN.show()
})

WINDOW_MAIN.webContents.setWindowOpenHandler((details) => {
  shell.openExternal(details.url)

  return {
    action: 'deny',
  }
})

if (is.dev && ENV.ELECTRON_RENDERER_URL) {
  WINDOW_MAIN.loadURL(ENV.ELECTRON_RENDERER_URL)
} else {
  WINDOW_MAIN.loadFile(join(__dirname, '../../renderer/index.html'))
}

export { WINDOW_MAIN }
