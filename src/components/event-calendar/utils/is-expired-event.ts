import { DEFAULT_END_HOUR } from '@/components/event-calendar/constants'
import { getHours, getMinutes, isAfter, isBefore, startOfDay } from 'date-fns'

export type ExpiredEvent = {
  date: Date | undefined
  endTime?: { hour: number; minute: number }
}

export function isExpiredEvent(props: ExpiredEvent): boolean {
  const { date, endTime } = props
  const now = new Date()
  const today = startOfDay(now)
  const eventEndDay = startOfDay(date ?? now)

  if (isBefore(eventEndDay, today)) return true

  if (isAfter(eventEndDay, today)) return false

  const currentTime = { hour: getHours(now), minute: getMinutes(now) }
  if (
    currentTime.hour > (endTime?.hour ?? DEFAULT_END_HOUR.hour) ||
    (currentTime.hour === endTime?.hour && currentTime.minute >= endTime.minute)
  ) {
    return true
  }
  return false
}
