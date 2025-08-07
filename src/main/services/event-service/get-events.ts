import { db } from '../../db'
import { CalendarEventModel, GetEventByDayProps } from '../../../shared/types'
import { and } from 'drizzle-orm'

export async function getEvents(): Promise<CalendarEventModel[] | null> {
  try {
    const events = await db.query.event.findMany()
    return events
  } catch {
    return null
  }
}

export async function getEventByDay(date: GetEventByDayProps): Promise<CalendarEventModel[] | null> {
  try {
    const eventByDay = await db.query.event.findMany({
      where: (event, { lte, gte }) =>
        and(lte(event.startDate, date), gte(event.endDate, date))
    })

    return eventByDay
  } catch {
    return null
  }
}
