import { db } from '../../db'
import { event } from '../../db/schemas/event'
import { EventSchema } from '../../../shared/schemas'
import { ResponseProps } from '../../../shared/types'

export async function createEvent(values: EventSchema): ResponseProps {
  try {
    await db.insert(event).values({
      title: values.title || '(no title)',
      description: values.description,
      endDate: values.endDate,
      startDate: values.startDate,
      color: values.color
    })

    return { ok: true, code: 200 }
  } catch {
    return { ok: false, code: 500 }
  }
}
