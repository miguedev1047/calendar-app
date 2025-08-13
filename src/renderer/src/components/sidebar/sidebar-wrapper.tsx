import { SidebarProvider, SidebarInset } from '@renderer/components/animate-ui/radix/sidebar'
import { Header } from '@renderer/components/header/header'
import { AppSidebar } from '@renderer/components/sidebar'

export function CalenderSidebarWrapper({ children }: React.PropsWithChildren): React.JSX.Element {
  return (
    <SidebarProvider className="select-none">
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex-1 flex-col gap-4 p-4">
          <div className="grid grid-rows-[auto_1fr]">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}