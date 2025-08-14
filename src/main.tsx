import '@/styles/base.css'

import { scan } from 'react-scan'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Loader } from '@/components/loader'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

scan({ enabled: process.env.NODE_ENV === 'development' })

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 0,
  defaultPendingComponent: () => <Loader />,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

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
