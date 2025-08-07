import { TW_COLORS, TW_ENUMS } from "@renderer/constants/colors"

export function getEventColor(color: (typeof TW_ENUMS)[number] | null | undefined): string | undefined {
  const colors = TW_COLORS.find((item) => item.key === color)
  if (!colors) return undefined
  return colors.value
}
