import { EXAMPLE_EVENTS } from '@/constants'
import { type CalendarEventModel } from '@/types'
import { create } from 'zustand'

interface EventsState {
  events: CalendarEventModel[]
  setEvents: (events: CalendarEventModel[]) => void
  addEvent: (event: CalendarEventModel) => void
  removeEvent: (eventId: string) => void
  updateEvent: (updatedEvent: CalendarEventModel) => void
}

export const useEvents = create<EventsState>((set) => ({
  events: EXAMPLE_EVENTS,
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  removeEvent: (eventId) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== eventId)
    })),
  updateEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    }))
}))
