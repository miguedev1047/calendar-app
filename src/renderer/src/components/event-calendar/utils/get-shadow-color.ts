import { TW_SHADOWS } from '@renderer/components/event-calendar/constants'
import { TwEnums } from '@renderer/components/event-calendar/types'

export function getShadowColor(color: TwEnums | undefined): string | undefined {
  const shadows = TW_SHADOWS.find((item) => item.key === color)
  if (!shadows) return undefined
  return shadows.value
}