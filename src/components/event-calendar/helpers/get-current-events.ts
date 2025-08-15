import type { CalendarEventModel } from '@/components/event-calendar/types'
import { newDate } from '@/helpers/new-date'
import { getMonth } from 'date-fns'

export type GetCurrentEventsByDate = {
  events: CalendarEventModel[]
  month: number
  year: number
}

export function getCurrentEventsByDate(props: GetCurrentEventsByDate): CalendarEventModel[] {
  const { events, month, year } = props

  const filteredEvents = events.filter(
    (item) => getMonth(newDate(item.startDate)) === getMonth(new Date(year, month))
  )

  return filteredEvents
}
