import 'dotenv/config'
import icon from '../../resources/icon.png?asset'

import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { createEvent } from './services/event-service/create-event'
import { CreateEvent, DeleteEvent, GetEventByDay, GetEvents, UpdateEvent } from '../shared/models'
import { getEventByDay, getEvents } from './services/event-service/get-events'
import { updateEvent } from './services/event-service/update-event'
import { deleteEvent } from './services/event-service/delete-event'

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
      preload: join(__dirname, '../preload/index.js'),
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
  ipcMain.handle('get-events', (_event, ...args: Parameters<GetEvents>) => getEvents(...args))
  ipcMain.handle('get-event-by-day', (_event, ...args: Parameters<GetEventByDay>) => getEventByDay(...args))
  ipcMain.handle('create-event', (_event, ...args: Parameters<CreateEvent>) => createEvent(...args))
  ipcMain.handle('update-event', (_event, ...args: Parameters<UpdateEvent>) => updateEvent(...args))
  ipcMain.handle('delete-event', (_event, ...args: Parameters<DeleteEvent>) => deleteEvent(...args))
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
