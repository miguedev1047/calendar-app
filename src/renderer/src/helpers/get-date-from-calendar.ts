import { CalendarStore } from './get-calendar'

export function getDateFromCalendarData(data?: CalendarStore | null): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (
    !data?.year ||
    !data?.month ||
    !data?.day ||
    (data.year === 0 && data.month === 0 && data.day === 0)
  ) {
    return today
  }

  return new Date(data.year, data.month, data.day)
}
