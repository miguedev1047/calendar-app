import type { CalendarEventModel } from '@/components/event-calendar/types'
import { newDate } from '@/helpers/new-date'
import { addDays, format, getMonth, getUnixTime, startOfDay } from 'date-fns'

export type UpcomingEvents = { date: string; events: CalendarEventModel[] }

export type GetUpcomingEventsByDate = {
  events: CalendarEventModel[]
  month: number
  year: number
}

export type GroupedEventsRecord = Record<string, CalendarEventModel[]>

export function getUpcomingEventsByDate(props: GetUpcomingEventsByDate): UpcomingEvents[] {
  const { events, month, year } = props

  const groupedEvents = Object.entries(
    events.reduce((acc, event) => {
      const startDate = startOfDay(addDays(newDate(event.startDate), 1))
      const dateKey = format(startDate, 'yyy-MM-dd')
      if (!acc[dateKey]) acc[dateKey] = []
      acc[dateKey].push({ ...event })
      return acc
    }, {} as GroupedEventsRecord)
  )
    .map(([date, events]) => ({ date, events }))
    .filter((item) => getUnixTime(item.date) >= getUnixTime(new Date(year, month)))
    .filter((item) => getMonth(item.date) === getMonth(new Date(year, month)))
    .sort((a, b) => getUnixTime(a.date) - getUnixTime(b.date))

  return groupedEvents
}
