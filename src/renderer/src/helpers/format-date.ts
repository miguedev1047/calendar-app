import { format, getUnixTime } from 'date-fns'

export function formatDate(date: Date | undefined): string {
  const formattedDate = date ? format(date, 'PPP') : format(new Date(), 'PPP')
  return formattedDate
}

export function formatUnixDate(date: Date | undefined): number {
  const newDate = date ? getUnixTime(date) : getUnixTime(new Date())
  return newDate
}
