import { type CalendarEventModel } from '@/types'
import { filterEventsByDate } from '@/helpers/filter-events'
import { useEvents } from '@/stores/use-events'
import { useCallback, useMemo } from 'react'
import { useEventDialog } from '@/stores/use-event-dialog'

export type MouseEvent = React.MouseEvent<HTMLButtonElement | HTMLDivElement>

export type UseEventListLogic = {
  filteredEvents: CalendarEventModel[]
  handleUpdateEvent: (e: MouseEvent, event: CalendarEventModel) => void
}

export function useEventListLogic(date: Date): UseEventListLogic {
  const events = useEvents((s) => s.events)
  const openEventDialog = useEventDialog((s) => s.openEventDialog)

  const filteredEvents = useMemo(
    () => filterEventsByDate({ opts: { date, events } }),
    [date, events]
  )

  const handleUpdateEvent = useCallback(
    (e: MouseEvent, event: CalendarEventModel): void => {
      e.stopPropagation()
      openEventDialog({ isOpen: true, event, mode: 'edit' })
    },
    [openEventDialog]
  )

  return { filteredEvents, handleUpdateEvent }
}
