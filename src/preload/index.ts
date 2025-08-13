import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { CloseWindow, MinimizeWindow, ToggleMaximizeWindow } from '../shared/models'

const api = {
  closeWindow: (...args: Parameters<CloseWindow>) => ipcRenderer.send('close-window', ...args),
  minimizeWindow: (...args: Parameters<MinimizeWindow>) =>
    ipcRenderer.send('minimize-window', ...args),
  toggleMaximizeWindow: (...args: Parameters<ToggleMaximizeWindow>) =>
    ipcRenderer.send('toggle-maximize-window', ...args)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
