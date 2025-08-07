import { eventByDayQueryOpts } from '@renderer/queries/use-get-events'
import { useQuery } from '@tanstack/react-query'
import { DayItemProps } from '@renderer/types'
import { EventItem } from './event-item'

export function EventList(props: DayItemProps): React.JSX.Element | null {
  const { data, calendar } = props
  const { date } = data
  const { isLoading, data: events } = useQuery(eventByDayQueryOpts(date))

  if (isLoading) return null

  return (
    <div className="space-y-1">
      {events &&
        events.map((event) => {
          return <EventItem key={event.id} event={event} calendar={calendar} />
        })}
    </div>
  )
}
