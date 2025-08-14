import { TW_EVENT_COLORS } from '@/components/event-calendar/constants'
import { type TwEnums } from '@/components/event-calendar/types'

export const randomColor = (): TwEnums => {
  const random = Math.floor(Math.random() * TW_EVENT_COLORS.length)
  return TW_EVENT_COLORS[random].key
}
