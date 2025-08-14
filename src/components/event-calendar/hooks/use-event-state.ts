import { type CalendarEventModel } from '@/types'
import { format } from 'date-fns'
import { type CalendarProps } from '@/components/event-calendar/types'
import { isExpiredEvent } from '@/components/event-calendar/utils'

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
