import { useCalendar } from '@/stores/use-calendar'
import { useEvents } from '@/stores/use-events'
import { getCurrentEventsByDate } from '@/components/event-calendar/helpers'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function TotalEvents({
  className,
  ...props
}: React.ComponentProps<typeof Badge>): React.JSX.Element {
  const month = useCalendar((s) => s.month)
  const year = useCalendar((s) => s.year)
  const events = useEvents((s) => s.events)
  const currentEvents = getCurrentEventsByDate({ events, month, year })

  return (
    <Badge variant="outline" className={cn('text-xs', className)} {...props}>
      <span className="hidden sm:inline">{currentEvents.length} Events</span>
      <span className="sm:hidden">{currentEvents.length}</span>
    </Badge>
  )
}
