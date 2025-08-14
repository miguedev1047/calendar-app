import { filterEventsByDate } from '@/helpers/filter-events'
import { useDialog } from '@/stores/use-dialog'
import { useEvents } from '@/stores/use-events'
import { type CalendarEventModel } from '@/types'
import { useCallback, useMemo } from 'react'

export type UseEventListLogic = {
  filteredEvents: CalendarEventModel[]
  handleUpdateEvent: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    event: CalendarEventModel
  ) => void
}

export function useEventListLogic(date: Date): UseEventListLogic {
  const events = useEvents((s) => s.events)
  const openDialog = useDialog((s) => s.openDialog)

  const filteredEvents = useMemo(
    () => filterEventsByDate({ opts: { date, events } }),
    [date, events]
  )

  const handleUpdateEvent = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>, event: CalendarEventModel): void => {
      e.stopPropagation()
      openDialog({ isOpen: true, event, mode: 'edit' })
    },
    [openDialog]
  )

  return { filteredEvents, handleUpdateEvent }
}
