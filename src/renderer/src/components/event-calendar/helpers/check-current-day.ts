import { isSameDay } from 'date-fns'

export type CheckCurrentDay = {
  opts: { dayToCheck: number; currentMonth: number; currentYear: number }
}

export function checkCurrentDay({ opts }: CheckCurrentDay): boolean {
  const { dayToCheck, currentMonth, currentYear } = opts

  const today = new Date()
  const dateToCheck = new Date(currentYear, currentMonth, dayToCheck)

  return isSameDay(today, dateToCheck)
}
