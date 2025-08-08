import { TW_COLORS, TwEnums } from '@renderer/components/event-calendar'

export const randomColor = (): TwEnums => {
  const random = Math.floor(Math.random() * TW_COLORS.length)
  return TW_COLORS[random].key
}
