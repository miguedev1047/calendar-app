import { format, getDate, getMonth, getYear } from 'date-fns'

export const now = new Date()

export const actualMonth = getMonth(now)
export const actualDay = getDate(now)
export const actualYear = getYear(now)

export const actualStrWeekday = format(now, 'EEEE')
export const actualStrMonth = format(now, 'MMMM')
export const actualStrYear = format(now, 'yyyy')

export const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
