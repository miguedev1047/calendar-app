import { TW_EVENT_COLORS } from '@renderer/components/event-calendar/constants'
import { TwEnums } from '@renderer/components/event-calendar/types'

export function getEventColor(color: TwEnums | undefined): string | undefined {
  const colors = TW_EVENT_COLORS.find((item) => item.key === color)
  if (!colors) return undefined
  return colors.value
}