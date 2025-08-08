import { TW_COLORS, TW_SHADOWS } from './constants'
import { TwEnums } from './types'

export function getEventColor(color: TwEnums | undefined): string | undefined {
  const colors = TW_COLORS.find((item) => item.key === color)
  if (!colors) return undefined
  return colors.value
}

export function getShadowColor(color: TwEnums | undefined): string | undefined {
  const shadows = TW_SHADOWS.find((item) => item.key === color)
  if (!shadows) return undefined
  return shadows.value
}
