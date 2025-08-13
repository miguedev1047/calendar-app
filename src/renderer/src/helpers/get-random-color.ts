import { TW_EVENT_COLORS } from '@renderer/components/event-calendar/constants'
import { TwEnums } from '@renderer/components/event-calendar/types'

export const randomColor = (): TwEnums => {
  const random = Math.floor(Math.random() * TW_EVENT_COLORS.length)
  return TW_EVENT_COLORS[random].key
}
