import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { ThemeProvider } from '@/components/theme-provider'
import { Loader } from '@/components/loader'
import { Toaster } from '@/components/ui/sonner'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { CalenderSidebarWrapper } from '@/components/sidebar'
import { EventDialog } from '@/components/event-calendar/components/shared'

export const Route = createRootRoute({
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
      </ThemeProvider>
    </>
  )
}
