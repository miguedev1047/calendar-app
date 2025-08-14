import { newDate } from '@/helpers/new-date'
import { addHours, format } from 'date-fns'

export type TimeMode = 'start-time' | 'end-time'

export interface TimeObject {
  hour?: number
  minute?: number
}

export interface GetEventTimeParams {
  date: Date | undefined
  mode: TimeMode
  startTime?: TimeObject
  endTime?: TimeObject
}

export function getEventTime(props: GetEventTimeParams): string {
  const { date, mode, startTime, endTime } = props

  if (mode === 'start-time') {
    const addHoursDate = addHours(newDate(date), startTime?.hour ?? 0)
    const addMinutesDate = addHours(addHoursDate, startTime?.minute ?? 0)
    return format(addMinutesDate, 'HH:mm aa')
  }

  if (mode === 'end-time') {
    const addHoursDate = addHours(newDate(date), endTime?.hour ?? 0)
    const addMinutesDate = addHours(addHoursDate, endTime?.minute ?? 0)
    return format(addMinutesDate, 'HH:mm aa')
  }

  return ''
}
