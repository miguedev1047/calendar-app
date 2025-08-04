import '@renderer/styles/base.css'

import { scan } from 'react-scan'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashHistory, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

scan({ enabled: process.env.NODE_ENV === 'development' })

const memoryHashHistory = createHashHistory()

const router = createRouter({ routeTree, defaultPreload: 'intent', history: memoryHashHistory })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!

if (!rootElement) {
  throw new Error('Root element not found')
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}
