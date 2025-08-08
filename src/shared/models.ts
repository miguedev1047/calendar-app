import { EventSchema } from './schemas'
import { GetEventByDayProps, DeleteEventProps, ResponseProps } from './types'

export type GetEvents = () => Promise<Event[] | null>
export type GetEventByDay = (data: GetEventByDayProps) => Promise<Event[] | null>
export type CreateEvent = (data: EventSchema) => ResponseProps
export type UpdateEvent = (data: EventSchema) => ResponseProps
export type DeleteEvent = (data: DeleteEventProps) => ResponseProps
export type CloseWindow = () => Promise<void>
export type ToggleMaximizeWindow = () => Promise<void>
export type MinimizeWindow = () => Promise<void>
