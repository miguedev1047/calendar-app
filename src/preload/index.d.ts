import { ElectronAPI } from '@electron-toolkit/preload'
import { EventSchema } from '@shared/schemas'
import { CalendarEventModel, DeleteEventProps, GetEventByDayProps, ResponseProps } from '@shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getEvents: () => Promise<CalendarEventModel[] | null>
      getEventByDay: (data: GetEventByDayProps) => Promise<CalendarEventModel[] | null>
      createEvent: (data: EventSchema) => ResponseProps
      updateEvent: (data: EventSchema) => ResponseProps
      deleteEvent: (data: DeleteEventProps) => ResponseProps
    }
  }
}
