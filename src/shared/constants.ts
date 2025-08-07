import { format, getDate, getMonth, getYear } from 'date-fns'

export const now = new Date()

export const actualMonth = getMonth(now)
export const actualDay = getDate(now)
export const actualYear = getYear(now)

export const actualStrWeekday = format(now, 'EEEE')
export const actualStrMonth = format(now, 'MMMM')
export const actualStrYear = format(now, 'yyyy')

export const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const TW_COLORS = [
  { key: 'PINK', value: 'bg-pink-300' },
  { key: 'FUCHSIA', value: 'bg-fuchsia-300' },
  { key: 'PURPLE', value: 'bg-purple-300' },
  { key: 'VIOLET', value: 'bg-violet-300' },
  { key: 'INDIGO', value: 'bg-indigo-300' },
  { key: 'BLUE', value: 'bg-blue-300' },
  { key: 'CYAN', value: 'bg-cyan-300' },
  { key: 'GREEN', value: 'bg-green-300' },
  { key: 'YELLOW', value: 'bg-yellow-300' },
  { key: 'ORANGE', value: 'bg-orange-300' }
] as const

export const TW_ENUMS = [
  'PINK',
  'FUCHSIA',
  'PURPLE',
  'VIOLET',
  'INDIGO',
  'BLUE',
  'CYAN',
  'GREEN',
  'YELLOW',
  'ORANGE'
] as const
