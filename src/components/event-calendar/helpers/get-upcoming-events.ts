import { newDate } from '@/helpers/new-date'
import { format, getUnixTime, startOfDay } from 'date-fns'
import type { CalendarEventModel } from '@/components/event-calendar/types'

export type UpcomingEvents = { date: string; events: CalendarEventModel[] }

export type GroupedEventsRecord = Record<string, CalendarEventModel[]>

export function getUpcomingEventsByDate(events: CalendarEventModel[]): UpcomingEvents[] {
  const groupedEvents = Object.entries(
    events.reduce((acc, event) => {
      const dateKey = format(newDate(event.startDate), 'yyyy-MM-dd')
      if (!acc[dateKey]) acc[dateKey] = []
      acc[dateKey].push({ ...event })
      return acc
    }, {} as GroupedEventsRecord)
  )
    .map(([date, events]) => ({ date, events }))
    .filter((item) => getUnixTime(item.date) >= getUnixTime(startOfDay(new Date())))
    .sort((a, b) => getUnixTime(a.date) - getUnixTime(b.date))

  return groupedEvents
}
