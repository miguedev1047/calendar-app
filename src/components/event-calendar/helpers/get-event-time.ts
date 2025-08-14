import { newDate } from '@/helpers/new-date'
import { addHours, addMinutes, format, getTime, startOfDay } from 'date-fns'
import { DEFAULT_END_HOUR, DEFAULT_START_HOUR } from '@/components/event-calendar/constants'

export type TimeMode = 'start-time' | 'end-time'

export interface TimeObject {
  hour: number
  minute: number
}

export interface GetEventTimeParams {
  date: Date | undefined
  mode: TimeMode
  startTime?: TimeObject
  endTime?: TimeObject
}

export function getEventTime(props: GetEventTimeParams): string {
  const { date, mode, startTime = DEFAULT_START_HOUR, endTime = DEFAULT_END_HOUR } = props

  if (mode === 'start-time') {
    const addHoursDate = addHours(startOfDay(newDate(date)), startTime.hour)
    const addMinutesDate = addMinutes(addHoursDate, startTime.minute)
    const time = format(getTime(addMinutesDate), 'h:mm aaaa')
    return time
  }
  
  if (mode === 'end-time') {
    const addHoursDate = addHours(startOfDay(newDate(date)), endTime.hour)
    const addMinutesDate = addMinutes(addHoursDate, endTime.minute)
    const time = format(getTime(addMinutesDate), 'h:mm aaaa')
    return time
  }

  return ''
}
