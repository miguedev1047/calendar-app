import { TW_NORMAL_COLORS } from '@renderer/components/event-calendar/constants'
import { TwEnums } from '@renderer/components/event-calendar/types'

export function getNormalColor(color: TwEnums | undefined): string | undefined {
  const normalColors = TW_NORMAL_COLORS.find((item) => item.key === color)
  if (!normalColors) return undefined
  return normalColors.value
}