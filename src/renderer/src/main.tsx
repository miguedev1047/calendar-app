import '@renderer/styles/base.css'

import { scan } from 'react-scan'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Loader } from '@renderer/components/loader'
import { RouterProvider, createHashHistory, createRouter } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@renderer/utils/query-client'

import { routeTree } from './routeTree.gen'

scan({ enabled: process.env.NODE_ENV === 'development' })

const memoryHashHistory = createHashHistory()

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 0,
  history: memoryHashHistory,
  context: { queryClient },
  defaultPendingComponent: () => <Loader />,
  Wrap: function WrapComponent({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
})

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
