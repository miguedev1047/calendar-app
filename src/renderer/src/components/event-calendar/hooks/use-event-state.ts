import { CalendarEventModel } from '@renderer/types'
import { format } from 'date-fns'
import { CalendarProps } from '@renderer/components/event-calendar/types'
import { isExpiredEvent } from '@renderer/components/event-calendar/utils'

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
