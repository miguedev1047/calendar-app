import { format, getDate, getMonth, getYear } from 'date-fns'
import { type CalendarBase } from '@/components/event-calendar/types'
import { checkCurrentDay } from '@/components/event-calendar/helpers'

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