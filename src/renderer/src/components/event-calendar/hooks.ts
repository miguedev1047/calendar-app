import { filterEventsByDate } from '@renderer/helpers/filter-events'
import { useDialog } from '@renderer/stores/use-dialog'
import { useEvents } from '@renderer/stores/use-events'
import { CalendarEventModel } from '@renderer/types'
import { useCallback, useMemo } from 'react'
import { CalendarProps, UseEventListLogic } from '@renderer/components/event-calendar/types'
import { isExpiredEvent } from '@renderer/components/event-calendar/utils'
import { format } from 'date-fns'

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

export function useEventState(
  event: CalendarEventModel,
  calendar: CalendarProps[],
  index: number
): {
  disableDrag: boolean
  isPastEvent: boolean
} {
  const { startDate, endDate, endTime } = event
  const currentCalendarDate = calendar[index]
  const currentDate = format(currentCalendarDate.date, 'yyyy-MM-dd')
  const eventStartDate = format(startDate!, 'yyyy-MM-dd')
  const disableDrag = eventStartDate !== currentDate
  const isPastEvent = isExpiredEvent({ date: endDate, endTime })
  return { disableDrag, isPastEvent }
}
