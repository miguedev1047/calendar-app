import { type CalendarEventModel } from '@/types'
import { getUnixTime, startOfDay } from 'date-fns'

interface FilterEventsByDate {
  opts: {
    events: CalendarEventModel[]
    date: Date
  }
}

export function filterEventsByDate(FilterEventsByDate: FilterEventsByDate): CalendarEventModel[] {
  const { opts } = FilterEventsByDate
  const { events, date } = opts

  const today = new Date()
  const unixTime = getUnixTime(date)

  return events.filter(
    (evt) =>
      getUnixTime(startOfDay(evt.startDate ?? today)) <= unixTime &&
      getUnixTime(startOfDay(evt.endDate ?? today)) >= unixTime
  )
}
