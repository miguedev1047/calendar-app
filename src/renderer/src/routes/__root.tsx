import type { JSX } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Header } from '@renderer/components/header'

export const Route = createRootRoute({
  component: RootComponent
})

function RootComponent(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
