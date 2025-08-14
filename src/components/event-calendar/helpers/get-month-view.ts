import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  getDay,
  startOfMonth,
  subDays
} from 'date-fns'
import { type CalendarOptions, type Months } from '@/components/event-calendar/types'
import { mapDateToCalendarBase } from '@/components/event-calendar/helpers'

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

  const months = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  return months.map((date) => mapDateToCalendarBase(date, month, year))
}