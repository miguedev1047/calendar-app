import { TW_SHADOWS } from '@/components/event-calendar/constants'
import { type TwEnums } from '@/components/event-calendar/types'

export function getShadowColor(color: TwEnums | undefined): string | undefined {
  const shadows = TW_SHADOWS.find((item) => item.key === color)
  if (!shadows) return undefined
  return shadows.value
}