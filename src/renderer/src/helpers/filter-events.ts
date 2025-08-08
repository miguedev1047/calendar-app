import { CalendarEventModel } from '@renderer/types'
import { getUnixTime } from 'date-fns'

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
      getUnixTime(evt.startDate ?? today) <= unixTime &&
      getUnixTime(evt.endDate ?? today) >= unixTime
  )
}
