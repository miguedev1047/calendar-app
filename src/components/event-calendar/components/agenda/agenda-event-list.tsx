import { type CalendarEventModel } from '@/types'
import { AgendaEventItem } from '@/components/event-calendar/components/agenda'

interface AgendaEventListProps {
  events: CalendarEventModel[]
}

export function AgendaEventList(props: AgendaEventListProps): React.JSX.Element {
  const { events } = props

  return (
    <div className="space-y-2 w-full">
      {events.map((event) => (
        <AgendaEventItem key={event.id} {...event} />
      ))}
    </div>
  )
}