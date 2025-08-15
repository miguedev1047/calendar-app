import { useCalendar } from '@/stores/use-calendar'
import { type UseHeaderLogic } from '@/components/header/types'
import { useNoteDialog } from '@/stores/use-note-dialog'
import { useEventDialog } from '@/stores/use-event-dialog'

export function useHeaderLogic(): UseHeaderLogic {
  const strDate = useCalendar((s) => s.strDate())
  const month = useCalendar((s) => s.month)
  const year = useCalendar((s) => s.year)
  const onNextMonth = useCalendar((s) => s.nextMonth)
  const onPrevMonth = useCalendar((s) => s.prevMonth)
  const onGoToToday = useCalendar((s) => s.goToToday)
  const openEventDialog = useEventDialog((s) => s.openEventDialog)
  const openNoteDialog = useNoteDialog(s => s.openNoteDialog )
  const calendarDate = new Date(year, month)

  const handleCreateEvent = (): void => {
    openEventDialog({ isOpen: true, mode: 'create' })
  }

  const handleCreateNote = (): void => {
    openNoteDialog({ isOpen: true, mode: 'create' })
  }

  return {
    strDate,
    month,
    year,
    onNextMonth,
    onPrevMonth,
    onGoToToday,
    calendarDate,
    handleCreateEvent,
    handleCreateNote,
  }
}
