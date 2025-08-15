export type UseHeaderLogic = {
  strDate: string
  month: number
  year: number
  calendarDate: Date
  onNextMonth: () => void
  onPrevMonth: () => void
  onGoToToday: () => void
  handleCreateEvent: () => void
  handleCreateNote: () => void
}
