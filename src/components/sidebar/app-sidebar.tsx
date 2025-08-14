import { Sidebar, SidebarContent, SidebarRail } from '@/components/animate-ui/radix/sidebar'
import { NavigationMenu } from '@/components/sidebar'
import { SidebarDatePicker } from '@/components/sidebar'
import { AppSidebarHeader } from '@/components/sidebar'

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
