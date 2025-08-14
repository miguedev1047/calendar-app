export function newDate(date: Date | undefined): Date {
  const now = new Date()
  return new Date(date ?? now)
}
