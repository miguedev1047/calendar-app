import {
  DEFAULT_END_HOUR,
  END_HOUR,
  STAR_HOUR,
  TW_EVENT_COLORS,
  TW_NORMAL_COLORS,
  TW_SHADOWS
} from '@renderer/components/event-calendar/constants'
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  subDays,
  getHours,
  getMinutes,
  isAfter,
  isBefore,
  startOfDay
} from 'date-fns'
import { ExpiredEvent, TwEnums, CalendarOptions, Months } from '@renderer/components/event-calendar/types'
import { mapDateToCalendarBase } from '@renderer/components/event-calendar/helpers'

export function getEventColor(color: TwEnums | undefined): string | undefined {
  const colors = TW_EVENT_COLORS.find((item) => item.key === color)
  if (!colors) return undefined
  return colors.value
}

export function getShadowColor(color: TwEnums | undefined): string | undefined {
  const shadows = TW_SHADOWS.find((item) => item.key === color)
  if (!shadows) return undefined
  return shadows.value
}

export function getNormalColor(color: TwEnums | undefined): string | undefined {
  const normalColors = TW_NORMAL_COLORS.find((item) => item.key === color)
  if (!normalColors) return undefined
  return normalColors.value
}

export function generateHours(): { label: string; value: string }[] {
  const hours: { label: string; value: string }[] = []
  for (let hour = STAR_HOUR; hour < END_HOUR; hour++) {
    const formattedHour = hour.toString().padStart(2, '0')
    const date = new Date(2000, 0, 1, hour)
    hours.push({ label: format(date, 'h:mm a'), value: formattedHour + ':00' })
  }

  return hours
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
