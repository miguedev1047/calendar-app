import { useCalendar } from '@/stores/use-calendar'
import { useEvents } from '@/stores/use-events'
import { getUpcomingEventsByDate } from '@/components/event-calendar/helpers'
import { Badge } from '@/components/ui/badge'

export function TotalEvents(): React.JSX.Element {
  const month = useCalendar((s) => s.month)
  const year = useCalendar((s) => s.year)
  const events = useEvents((s) => s.events)
  const upcomingEvents = getUpcomingEventsByDate({ events, month, year })
  
  return (
    <Badge variant="outline" className="text-xs">
      <span className="hidden sm:inline">{upcomingEvents.length} Events</span>
      <span className="sm:hidden">{upcomingEvents.length}</span>
    </Badge>
  )
}