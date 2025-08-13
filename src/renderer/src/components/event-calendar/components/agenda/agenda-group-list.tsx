import { useEvents } from '@renderer/stores/use-events'
import { getUnixTime } from 'date-fns'
import { AgendaGroupItem } from '@renderer/components/event-calendar/components/agenda'
import { getUpcomingEventsByDate } from '@renderer/components/event-calendar/helpers'

export function AgendaGroupList(): React.JSX.Element {
  const events = useEvents((s) => s.events)
  const upcomingEvents = getUpcomingEventsByDate(events)

  return (
    <div className="space-y-8 w-full relative">
      {upcomingEvents.map((item) => (
        <AgendaGroupItem key={getUnixTime(item.date)} {...item} />
      ))}
    </div>
  )
}
