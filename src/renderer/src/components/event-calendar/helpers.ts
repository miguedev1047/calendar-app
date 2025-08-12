import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDate,
  getDay,
  getMonth,
  getYear,
  isSameDay,
  startOfMonth,
  subDays
} from 'date-fns'
import {
  CalendarBase,
  CalendarOptions,
  CheckCurrentDay,
  Months
} from '@renderer/components/event-calendar/types'

export function mapDateToCalendarBase(
  date: Date,
  currentMonth: number,
  currentYear: number
): CalendarBase {
  return {
    date,
    day: getDate(date),
    month: getMonth(date),
    year: getYear(date),
    dayOfWeek: format(date, 'EEE'),
    today: checkCurrentDay({ opts: { dayToCheck: getDate(date), currentMonth, currentYear } }),
    inCurrentMonth: getMonth(date) === currentMonth
  }
}

export function checkCurrentDay({ opts }: CheckCurrentDay): boolean {
  const { dayToCheck, currentMonth, currentYear } = opts

  const today = new Date()
  const dateToCheck = new Date(currentYear, currentMonth, dayToCheck)

  return isSameDay(today, dateToCheck)
}

// Gen calendars
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


