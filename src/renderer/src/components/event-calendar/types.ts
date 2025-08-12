import { CalendarEventModel } from '@renderer/types'
import { TW_ENUMS } from '@renderer/components/event-calendar/constants'

export type TwEnums = (typeof TW_ENUMS)[number]

export type Views = 'month' | 'year' | 'day' | 'week'

export type ExpiredEvent = {
  date: Date | undefined
  endTime?: { hour: number; minute: number }
}

export type CheckCurrentDay = {
  opts: { dayToCheck: number; currentMonth: number; currentYear: number }
}

export type UseEventListLogic = {
  filteredEvents: CalendarEventModel[]
  handleUpdateEvent: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    event: CalendarEventModel
  ) => void
}

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

export type Months = CalendarBase

export type CalendarProps = Months & Weeks
