import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {
  CloseWindow,
  CreateEvent,
  DeleteEvent,
  GetEventByDay,
  GetEvents,
  MinimizeWindow,
  ToggleMaximizeWindow,
  UpdateEvent
} from '../shared/models'

const api = {
  getEvents: (...args: Parameters<GetEvents>) => ipcRenderer.invoke('get-events', ...args),
  getEventByDay: (...args: Parameters<GetEventByDay>) =>
    ipcRenderer.invoke('get-event-by-day', ...args),
  createEvent: (...args: Parameters<CreateEvent>) => ipcRenderer.invoke('create-event', ...args),
  updateEvent: (...args: Parameters<UpdateEvent>) => ipcRenderer.invoke('update-event', ...args),
  deleteEvent: (...args: Parameters<DeleteEvent>) => ipcRenderer.invoke('delete-event', ...args),

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
