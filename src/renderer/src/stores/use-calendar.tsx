import { Views } from '@renderer/components/event-calendar/types'
import { actualMonth, actualYear, actualDay } from '@shared/constants'
import { format } from 'date-fns'
import { create } from 'zustand'

interface CalendarState {
  month: number
  year: number
  day: number
  view: Views

  strWeekday: () => string
  strMonth: () => string
  strYear: () => string
  strDate: () => string

  nextMonth: () => void
  prevMonth: () => void
  goToToday: () => void

  updateYear: (year: number) => void
  updateMonth: (month: number) => void
  updateDay: (day: number) => void
  updateView: (view: Views) => void
}

export const useCalendar = create<CalendarState>((set, get) => ({
  month: actualMonth,
  day: actualDay,
  year: actualYear,
  view: 'month',

  strWeekday: () => {
    const { day, month, year } = get()
    return format(new Date(year, month, day), 'EEEE')
  },
  strMonth: () => {
    const { month, year } = get()
    return format(new Date(year, month), 'MMMM')
  },
  strYear: () => {
    const { year, month } = get()
    return format(new Date(year, month), 'yyyy')
  },
  strDate: () => {
    const { day, month, year } = get()
    return format(new Date(year, month, day), 'MMMM, yyy')
  },

  nextMonth: () => {
    const { month, year } = get()
    const nextMonth = month + 1
    const newMonth = nextMonth > 11 ? 0 : nextMonth
    const newYear = nextMonth > 11 ? year + 1 : year

    set({ month: newMonth, year: newYear })
  },
  prevMonth: () => {
    const { month, year } = get()

    const prevMonth = month - 1
    const newMonth = prevMonth < 0 ? 11 : prevMonth
    const newYear = prevMonth < 0 ? year - 1 : year

    set({ month: newMonth, year: newYear })
  },
  goToToday: () => {
    set({ month: actualMonth, year: actualYear, day: actualDay })
  },

  updateView: (view) => set(() => ({ view })),
  updateYear: (year: number) => set({ year }),
  updateMonth: (month: number) => set({ month }),
  updateDay: (day: number) => set({ day })
}))
