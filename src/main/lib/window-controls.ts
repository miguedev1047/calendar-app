import { BrowserWindow } from 'electron'

export function handleCloseWindow(): void {
  const win = BrowserWindow.getFocusedWindow()
  if (win) return win.close()
}

export function handleMinimizeWindow(): void {
  const win = BrowserWindow.getFocusedWindow()
  if (win) return win.minimize()
}

export function toggleMaximizeWindow(): void {
  const win = BrowserWindow.getFocusedWindow() 
  if (!win) return

  const isMaximized = win.isMaximized()
  if (isMaximized) return win.unmaximize()
  return win.maximize()
}