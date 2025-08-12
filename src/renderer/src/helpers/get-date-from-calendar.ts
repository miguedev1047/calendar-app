import { CalendarProps } from '@renderer/components/event-calendar/types'
import { getHours, getMinutes } from 'date-fns'

export function getDateFromCalendarData(data?: CalendarProps | null): Date {
  const today = new Date()

  const hour = getHours(today)
  const minute = getMinutes(today)

  if (
    !data?.year ||
    !data?.month ||
    !data?.day ||
    (data.year === 0 && data.month === 0 && data.day === 0)
  ) {
    return today
  }

  const newDate = new Date(data.year, data.month, data.day, hour, minute)
  return newDate
}
