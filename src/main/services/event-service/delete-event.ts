import { db } from '../../db'
import { event } from '../../db/schemas/event'
import { DeleteEventProps, ResponseProps } from '../../../shared/types'
import { eq } from 'drizzle-orm'

export async function deleteEvent(values: DeleteEventProps): ResponseProps {
  try {
    if (!values.id) {
      return { ok: false, code: 400 }
    }

    await db.delete(event).where(eq(event.id, values.id))

    return { ok: true, code: 200 }
  } catch {
    return { ok: false, code: 500 }
  }
}
