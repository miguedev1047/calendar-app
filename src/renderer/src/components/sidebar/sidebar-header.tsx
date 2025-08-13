import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@renderer/components/animate-ui/radix/sidebar'
import { Link } from '@tanstack/react-router'
import { CalendarIcon } from 'lucide-react'

export function AppSidebarHeader(): React.JSX.Element {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <CalendarIcon />
            <Link to='/' className="text-xl font-black">Notes Calendar</Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}