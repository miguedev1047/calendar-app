import { TW_EVENT_COLORS } from '@/components/event-calendar/constants'
import { type TwEnums } from '@/components/event-calendar/types'

export function getEventColor(color: TwEnums | undefined): string | undefined {
  const colors = TW_EVENT_COLORS.find((item) => item.key === color)
  if (!colors) return undefined
  return colors.value
}