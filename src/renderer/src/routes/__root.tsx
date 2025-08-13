import { createRootRouteWithContext, Outlet, useRouterState } from '@tanstack/react-router'
import { ThemeProvider } from '@renderer/components/theme-provider'
import { Loader } from '@renderer/components/loader'
import { Toaster } from '@renderer/components/ui/sonner'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { EventDialog } from '@renderer/components/event-calendar'
import { CalenderSidebarWrapper } from '@renderer/components/sidebar'

export interface RouterAppContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent
})

function RootComponent(): React.JSX.Element {
  const isFetching = useRouterState({ select: (s) => s.isLoading })
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        storageKey="vite-ui-theme"
      >
        <CalenderSidebarWrapper>
          {isFetching ? <Loader /> : <Outlet />}
          <EventDialog />
        </CalenderSidebarWrapper>
        <Toaster position="bottom-right" />
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </ThemeProvider>
    </>
  )
}
