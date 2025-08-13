import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@renderer/components/animate-ui/radix/sidebar'
import { CalendarIcon } from 'lucide-react'

export function AppSidebarHeader(): React.JSX.Element {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <CalendarIcon />
            <h2 className="text-xl font-black">Notes Calendar</h2>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}