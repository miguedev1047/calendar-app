import { TW_COLORS, TW_ENUMS } from '@renderer/constants/colors'

export const randomColor = (): (typeof TW_ENUMS)[number] => {
  const random = Math.floor(Math.random() * TW_COLORS.length)
  return TW_COLORS[random].key
}
