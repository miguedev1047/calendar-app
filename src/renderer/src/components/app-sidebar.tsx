import {
  SidebarProvider,
  SidebarInset,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail
} from '@renderer/components/animate-ui/radix/sidebar'
import { SidebarGroupContent } from '@renderer/components/animate-ui/radix/sidebar'
import { Calendar } from '@renderer/components/ui/calendar'
import { Plus } from 'lucide-react'
import { Header } from '@renderer/components/header'
import { useCalendar } from '@renderer/stores/use-calendar'
import { useDialog } from '@renderer/stores/use-dialog'

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>): React.JSX.Element {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <h2>Notes Calendar App</h2>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarDatePicker />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <NewEvent />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail/>
    </Sidebar>
  )
}

export function NewEvent(): React.JSX.Element {
  const openDialog = useDialog((s) => s.openDialog)

  const handleOpen = (): void => {
    openDialog({
      isOpen: true,
      event: { endDate: new Date(), startDate: new Date() },
      mode: 'create'
    })
  }

  return (
    <SidebarMenuButton onClick={handleOpen}>
      <Plus />
      <span>New Event</span>
    </SidebarMenuButton>
  )
}

export function SidebarDatePicker(): React.JSX.Element {
  const handlePrevMonth = useCalendar((s) => s.prevMonth)
  const handleNextMonth = useCalendar((s) => s.nextMonth)

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          onNextClick={handleNextMonth}
          onPrevClick={handlePrevMonth}
          className="[&_[role=gridcell]]:size-full [&_[role=gridcell]]:grid [&_[role=gridcell]]:place-items-center w-full bg-transparent "
        />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
