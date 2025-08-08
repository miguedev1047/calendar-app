import { CalendarStore } from '@renderer/helpers/get-calendar'
import { CalendarEventModel } from '@renderer/types'
import { create } from 'zustand'

type Mode = 'create' | 'edit' | null

interface DialogData {
  calendar?: CalendarStore | null
  event?: CalendarEventModel | null
  mode: Mode
  isOpen: boolean
}

interface DialogState {
  isOpen: boolean
  mode: Mode
  calendarData: CalendarStore | null
  eventData: CalendarEventModel | null
  openDialog: (params: DialogData) => void
  closeDialog: () => void
  setCalendarData: (day: CalendarStore | null) => void
  setEventData: (event: CalendarEventModel | null) => void
}

export const useDialog = create<DialogState>((set) => ({
  isOpen: false,
  mode: null,
  calendarData: null,
  eventData: null,
  openDialog: ({ calendar = null, event = null, mode, isOpen }: DialogData) =>
    set({ isOpen: isOpen, calendarData: calendar, eventData: event, mode }),
  closeDialog: () => set({ isOpen: false, mode: null, calendarData: null, eventData: null }),
  setCalendarData: (day) => set({ calendarData: day }),
  setEventData: (event) => set({ eventData: event })
}))
