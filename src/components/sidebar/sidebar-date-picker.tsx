import { SidebarGroup, SidebarGroupContent } from '@/components/animate-ui/radix/sidebar'
import { Calendar } from '@/components/ui/calendar'
import { useCalendar } from '@/stores/use-calendar'
import { useDialog } from '@/stores/use-dialog'

export function SidebarDatePicker(): React.JSX.Element {
  const handlePrevMonth = useCalendar((s) => s.prevMonth)
  const handleNextMonth = useCalendar((s) => s.nextMonth)
  const openDialog = useDialog((s) => s.openDialog)

  const handleOpen = (date: Date): void => {
    openDialog({ isOpen: true, event: { endDate: date, startDate: date }, mode: 'create' })
  }

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          onNextClick={handleNextMonth}
          onPrevClick={handlePrevMonth}
          onDayClick={handleOpen}
          className="[&_[role=gridcell]]:size-full [&_[role=gridcell]]:grid [&_[role=gridcell]]:place-items-center w-full bg-transparent "
        />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}