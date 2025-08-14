export type UseHeaderLogic = {
  strDate: string
  month: number
  year: number
  onNextMonth: () => void
  onPrevMonth: () => void
  onGoToToday: () => void
  calendarDate: Date
  handleCreateEvent: () => void
}
