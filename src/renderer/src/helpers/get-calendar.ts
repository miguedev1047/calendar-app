import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  getDay,
  getMonth,
  getYear,
  isSameDay,
  startOfMonth,
  subDays
} from 'date-fns'

import { format } from 'date-fns/format'

export type CalendarStore = {
  date: Date
  day: number
  month: number
  year: number
  today: boolean
  dayOfWeek: string
  inCurrentMonth: boolean
}

export type CalendarOptions = { opts: { year: number; month: number } }

export type CheckCurrentDayProps = {
  opts: { dayToCheck: number; currentMonth: number; currentYear: number }
}

export function getCalendar({ opts }: CalendarOptions): CalendarStore[] {
  const { year, month } = opts
  const firstDay = startOfMonth(new Date(year, month))
  const lastDay = endOfMonth(firstDay)

  const startDayOfWeek = getDay(firstDay)
  const daysBefore = startDayOfWeek
  const calendarStart = subDays(firstDay, daysBefore)

  const endDayOfWeek = getDay(lastDay)
  const daysAfter = 6 - endDayOfWeek
  const calendarEnd = addDays(lastDay, daysAfter)

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  return days.map((date) => {
    const day = date.getDate()
    const monthNum = getMonth(date)
    const yearNum = getYear(date)

    return {
      date,
      day,
      month: monthNum,
      year: yearNum,
      dayOfWeek: format(date, 'EEE'),
      today: checkCurrentDay({ opts: { dayToCheck: day, currentMonth: month, currentYear: year } }),
      inCurrentMonth: getMonth(date) === month
    }
  })
}

export function checkCurrentDay({ opts }: CheckCurrentDayProps): boolean {
  const { dayToCheck, currentMonth, currentYear } = opts

  const today = new Date()
  const dateToCheck = new Date(currentYear, currentMonth, dayToCheck)

  return isSameDay(today, dateToCheck)
}
