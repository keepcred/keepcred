import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'

import { logger } from './logger'

app.disableHardwareAcceleration()

app.on('before-quit', () => {
  logger.info('Приложение закрыто')
})

app.whenReady().then(() => {
  logger.warn('Приложение готово к запуску')

  const userModelId = 'com.keepcred'

  electronApp.setAppUserModelId(userModelId)
  logger.info(`Задан ID приложения: ${userModelId}`)

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  import('#/main/windows/window-main')

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) import('#/main/windows/window-main')
  })
})
