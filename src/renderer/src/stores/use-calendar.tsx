import { actualMonth, actualYear, actualDay } from '@shared/constants'
import { create } from 'zustand'

interface CalendarState {
  month: number
  year: number
  day: number

  strDay: () => string
  strMonth: () => string
  strYear: () => string

  updateYear: (year: number) => void
  updateMonth: (month: number) => void
  updateDay: (day: number) => void
}

export const useCalendar = create<CalendarState>((set, get) => ({
  month: actualMonth,
  day: actualDay,
  year: actualYear,

  strDay: () => {
    const { day, month, year } = get()
    return new Date(year, month, day).toLocaleString('en-US', { day: '2-digit' })
  },
  strMonth: () => {
    const { month, year } = get()
    return new Date(year, month).toLocaleString('en-US', { month: 'long' })
  },
  strYear: () => {
    const { year, month } = get()
    return new Date(year, month).toLocaleString('en-US', { year: 'numeric' })
  },

  updateYear: (year: number) => set({ year }),
  updateMonth: (month: number) => set({ month }),
  updateDay: (day: number) => set({ day })
}))
