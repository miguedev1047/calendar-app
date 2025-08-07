import { CalendarEventModel, GetEventByDayProps } from '@shared/types'
import { queryOptions } from '@tanstack/react-query'
import { format } from 'date-fns'

export const eventByDay = (date: Date) => ['event', format(date, 'yyyy-MM-dd')] as const

export async function getEvents(): Promise<CalendarEventModel[]> {
  const data = await window.api.getEvents()
  if (!data) {
    throw new Error('Error getting events')
  }
  return data
}

export async function getEventByDay(date: GetEventByDayProps): Promise<CalendarEventModel[]> {
  const data = await window.api.getEventByDay(date)
  if (!data) {
    throw new Error('Error getting event')
  }
  return data
}

export const eventQueryOpts = queryOptions({
  queryKey: ['events'],
  queryFn: getEvents
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const eventByDayQueryOpts = (date: GetEventByDayProps) =>
  queryOptions({
    queryKey: eventByDay(date),
    queryFn: () => getEventByDay(date)
  })
