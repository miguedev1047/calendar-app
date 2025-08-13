import 'dotenv/config'
import icon from '../../resources/icon.png?asset'

import { CloseWindow, MinimizeWindow, ToggleMaximizeWindow } from '../shared/models'
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import {
  handleCloseWindow,
  handleMinimizeWindow,
  toggleMaximizeWindow
} from './lib/window-controls'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 640,
    minHeight: 480,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.on('ready', () => {
  ipcMain.on('close-window', (_event, ...args: Parameters<CloseWindow>) =>
    handleCloseWindow(...args)
  )
  ipcMain.on('minimize-window', (_event, ...args: Parameters<MinimizeWindow>) =>
    handleMinimizeWindow(...args)
  )
  ipcMain.on('toggle-maximize-window', (_event, ...args: Parameters<ToggleMaximizeWindow>) =>
    toggleMaximizeWindow(...args)
  )
})

app.on('ready', async () => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
