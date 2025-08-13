import { TW_ENUMS } from '@renderer/components/event-calendar/constants'
import { EventSchema } from '@renderer/components/event-calendar/schemas'

export type TwEnums = (typeof TW_ENUMS)[number]

export type CalendarEventModel = EventSchema

export type Views = 'month' | 'year' | 'day' | 'week'

export type CalendarOptions = {
  opts: { year: number; month: number; view?: Views }
}

export type CalendarBase = {
  date: Date
  day: number
  month: number
  year: number
  today: boolean
  dayOfWeek: string
  inCurrentMonth: boolean
}

export type Hours = { label: string; value: string }[]

export interface Weeks extends CalendarBase {
  hours?: Hours
}

export interface Days extends CalendarBase {
  hours?: Hours
}

export interface Months extends CalendarBase {}

export type CalendarProps = Months & Weeks & Days
