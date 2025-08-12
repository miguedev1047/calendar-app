import { TW_EVENT_COLORS, TwEnums } from '@renderer/components/event-calendar'

export const randomColor = (): TwEnums => {
  const random = Math.floor(Math.random() * TW_EVENT_COLORS.length)
  return TW_EVENT_COLORS[random].key
}
