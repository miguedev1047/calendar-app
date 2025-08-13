export type UseHeaderLogic = {
  strDate: string
  month: number
  year: number
  onNextMonth: () => void
  onPrevMonth: () => void
  onGoToToday: () => void
  closeWindow: () => void
  minimizeWindow: () => void
  toggleMaximizeWindow: () => void
  calendarDate: Date
  handleCreateEvent: () => void
}
