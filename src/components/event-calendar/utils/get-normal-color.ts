import { TW_NORMAL_COLORS } from '@/components/event-calendar/constants'
import { type TwEnums } from '@/components/event-calendar/types'

export function getNormalColor(color: TwEnums | undefined): string | undefined {
  const normalColors = TW_NORMAL_COLORS.find((item) => item.key === color)
  if (!normalColors) return undefined
  return normalColors.value
}