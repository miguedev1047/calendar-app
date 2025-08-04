export type CalendarDay = {
  date: Date
  day: number
  month: number
  dayOfWeek: string
  today: boolean
  year: number
  inCurrentMonth: boolean
}

export type CalendarProps = {
  opts: { year: number; month: number }
}

export type CheckCurrentDayProps = {
  opts: {
    dayToCheck?: number
    currentMonth?: number
    currentYear?: number
  }
}

export function getCalendar({ opts }: CalendarProps): CalendarDay[] {
  const { year, month } = opts

  const result: CalendarDay[] = []
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  const startDay = firstDayOfMonth.getDay()
  const totalDaysInMonth = lastDayOfMonth.getDate()

  // Días del mes anterior para completar la primera semana
  for (let i = startDay - 1; i >= 0; i--) {
    const date = new Date(year, month, -i)
    result.push({
      date,
      day: date.getDate(),
      month: date.getMonth(),
      dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
      today: checkCurrentDay({ opts: { currentMonth: month, currentYear: year } }),
      year: date.getFullYear(),
      inCurrentMonth: false
    })
  }

  // Días del mes actual
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const date = new Date(year, month, i)
    result.push({
      date,
      day: i,
      month: date.getMonth(),
      dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
      today: checkCurrentDay({ opts: { dayToCheck: i, currentMonth: month, currentYear: year } }),
      year: date.getFullYear(),
      inCurrentMonth: true
    })
  }

  // Días del mes siguiente para completar la última semana (hasta sábado)
  const endDay = lastDayOfMonth.getDay()
  for (let i = 1; i < 7 - endDay; i++) {
    const date = new Date(year, month + 1, i)
    result.push({
      date,
      day: i,
      month: date.getMonth(),
      year: date.getFullYear(),
      dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
      today: checkCurrentDay({ opts: { currentMonth: month, currentYear: year } }),
      inCurrentMonth: false
    })
  }

  return result
}

export function checkCurrentDay({ opts }: CheckCurrentDayProps): boolean {
  const DEFAULT_DAY = new Date().getDate()
  const DEFAULT_MONTH = new Date().getMonth()
  const DEFAULT_YEAR = new Date().getFullYear()

  const { dayToCheck, currentMonth, currentYear } = opts

  const isSameDay =
    DEFAULT_DAY === dayToCheck && DEFAULT_MONTH === currentMonth && DEFAULT_YEAR === currentYear

  return isSameDay
}
