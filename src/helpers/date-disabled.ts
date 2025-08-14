import { isBefore, isSameDay, parseISO, startOfToday } from 'date-fns'

type DateDisabledOptions = { date: Date; startDate: Date; mode?: 'end' | 'start' }

export function isDateDisabled({ date, startDate, mode = 'start' }: DateDisabledOptions): boolean {
  const today = startOfToday()

  const isTooEarly = isBefore(date, parseISO('1900-01-01'))
  const isSameAsToday = isSameDay(date, today)
  const isBeforeToday = isBefore(date, today)

  const isBeforeStartDate = mode === 'end' && isBefore(date, startDate)

  if (isTooEarly) return true
  if (isBeforeToday && !isSameAsToday) return true
  if (isBeforeStartDate) return true

  return false
}
