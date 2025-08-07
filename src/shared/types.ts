import { InferInsertModel } from 'drizzle-orm'
import { event } from '../main/db/schema'
import { TW_ENUMS } from './constants'

export type StringUndefined = string | undefined
export type DateUndefined = Date | undefined
export type ColorUndefined = (typeof TW_ENUMS)[number] | undefined

export type ResponseProps = Promise<{ ok: boolean; code: number }>
export type CalendarEventModel = InferInsertModel<typeof event>
export type GetEventByDayProps = Date
export type DeleteEventProps = { id: string }
