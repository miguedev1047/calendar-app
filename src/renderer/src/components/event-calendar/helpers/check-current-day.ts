import { isSameDay } from 'date-fns'
import { CheckCurrentDay } from '@renderer/components/event-calendar/types'

export function checkCurrentDay({ opts }: CheckCurrentDay): boolean {
  const { dayToCheck, currentMonth, currentYear } = opts

  const today = new Date()
  const dateToCheck = new Date(currentYear, currentMonth, dayToCheck)

  return isSameDay(today, dateToCheck)
}