import { useCalendar } from '@renderer/stores/use-calendar'
import { UseHeaderLogic } from '@renderer/components/header/types'
import { useDialog } from '@renderer/stores/use-dialog'

export function useHeaderLogic(): UseHeaderLogic {
  const strDate = useCalendar((s) => s.strDate())
  const month = useCalendar((s) => s.month)
  const year = useCalendar((s) => s.year)
  const onNextMonth = useCalendar((s) => s.nextMonth)
  const onPrevMonth = useCalendar((s) => s.prevMonth)
  const onGoToToday = useCalendar((s) => s.goToToday)
  const openDialog = useDialog((s) => s.openDialog)

  const closeWindow = (): void => window.api.closeWindow()
  const minimizeWindow = (): void => window.api.minimizeWindow()
  const toggleMaximizeWindow = (): void => window.api.toggleMaximizeWindow()

  const calendarDate = new Date(year, month)

  const handleCreateEvent = (): void => {
    openDialog({ isOpen: true, mode: 'create' })
  }

  return {
    strDate,
    month,
    year,
    onNextMonth,
    onPrevMonth,
    onGoToToday,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    calendarDate,
    handleCreateEvent
  }
}
