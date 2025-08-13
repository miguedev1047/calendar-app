import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  getDay,
  startOfMonth,
  subDays
} from 'date-fns'
import { CalendarOptions, Months } from '@renderer/components/event-calendar/types'
import { mapDateToCalendarBase } from '@renderer/components/event-calendar/helpers'

export function getMonthView({ opts }: CalendarOptions): Months[] {
  const { year, month } = opts
  const firstDay = startOfMonth(new Date(year, month))
  const lastDay = endOfMonth(firstDay)

  const startDayOfWeek = getDay(firstDay)
  const daysBefore = startDayOfWeek
  const calendarStart = subDays(firstDay, daysBefore)

  const endDayOfWeek = getDay(lastDay)
  const daysAfter = 6 - endDayOfWeek
  const calendarEnd = addDays(lastDay, daysAfter)

  const weeks = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  return weeks.map((date) => mapDateToCalendarBase(date, month, year))
}