import { STAR_HOUR, END_HOUR } from '@/components/event-calendar/constants'
import { format } from 'date-fns'

export function generateHours(): { label: string; value: string }[] {
  const hours: { label: string; value: string }[] = []
  for (let hour = STAR_HOUR; hour < END_HOUR; hour++) {
    const formattedHour = hour.toString().padStart(2, '0')
    const date = new Date(2000, 0, 1, hour)
    hours.push({ label: format(date, 'h:mm a'), value: formattedHour + ':00' })
  }

  return hours
}