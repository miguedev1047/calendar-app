import { db } from '../../db'
import { event } from '../../db/schemas/event'
import { EventSchema } from '../../../shared/schemas'
import { ResponseProps } from '../../../shared/types'
import { eq } from 'drizzle-orm'

export async function updateEvent(values: EventSchema): ResponseProps {
  try {
    if (!values.id) {
      return { ok: false, code: 400 }
    }

    await db
      .update(event)
      .set({
        title: values.title,
        description: values.description,
        endDate: values.endDate,
        startDate: values.startDate,
        color: values.color
      })
      .where(eq(event.id, values.id))

    return { ok: true, code: 200 }
  } catch {
    return { ok: false, code: 500 }
  }
}
