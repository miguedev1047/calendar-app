import { useCalendar } from '@/stores/use-calendar'
import {type UseHeaderLogic } from '@/components/header/types'
import { useDialog } from '@/stores/use-dialog'

export function useHeaderLogic(): UseHeaderLogic {
  const strDate = useCalendar((s) => s.strDate())
  const month = useCalendar((s) => s.month)
  const year = useCalendar((s) => s.year)
  const onNextMonth = useCalendar((s) => s.nextMonth)
  const onPrevMonth = useCalendar((s) => s.prevMonth)
  const onGoToToday = useCalendar((s) => s.goToToday)
  const openDialog = useDialog((s) => s.openDialog)

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
    calendarDate,
    handleCreateEvent
  }
}
