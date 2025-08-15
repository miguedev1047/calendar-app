import { type CalendarBase } from '@/components/event-calendar/types'
import { type CalendarEventModel } from '@/types'
import { create } from 'zustand'

type EventDialogMode = 'create' | 'edit' | null

interface EventDialogData {
  calendar?: CalendarBase | null
  event?: CalendarEventModel | null
  mode: EventDialogMode
  isOpen: boolean
}

interface EventDialogState {
  isOpen: boolean
  mode: EventDialogMode
  calendarData: CalendarBase | null
  eventData: CalendarEventModel | null
  openEventDialog: (params: EventDialogData) => void
  closeEventDialog: () => void
  setCalendarData: (day: CalendarBase | null) => void
  setEventData: (event: CalendarEventModel | null) => void
}

export const useEventDialog = create<EventDialogState>((set) => ({
  isOpen: false,
  mode: null,
  calendarData: null,
  eventData: null,
  openEventDialog: ({ calendar = null, event = null, mode, isOpen }) => {
    return set({ isOpen, calendarData: calendar, eventData: event, mode })
  },
  closeEventDialog: () => {
    return set({ isOpen: false, mode: null, calendarData: null, eventData: null })
  },
  setCalendarData: (day) => set({ calendarData: day }),
  setEventData: (event) => set({ eventData: event })
}))