import { Sidebar, SidebarContent, SidebarRail } from '@renderer/components/animate-ui/radix/sidebar'
import { NavigationMenu } from '@renderer/components/sidebar'
import { SidebarDatePicker } from '@renderer/components/sidebar'
import { AppSidebarHeader } from '@renderer/components/sidebar'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>): React.JSX.Element {
  return (
    <Sidebar {...props}>
      <AppSidebarHeader />
      <SidebarContent>
        <NavigationMenu />
        <SidebarDatePicker />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
