import {
  MAX_VISIBLE_EVENTS,
  MIN_VISIBLE_EVENTS
} from '@/components/event-calendar/constants'
import { type CalendarEventModel } from '@/types'
import { type CalendarProps } from '@/components/event-calendar/types'
import { MemoizedBaseEventItem } from '@/components/event-calendar/components/calendar/event-item'
import { cn } from '@/lib/utils'
import { EventButton } from '@/components/event-calendar/components/calendar/event-button'
import { useEventState, useEventListLogic } from '@/components/event-calendar/hooks'
import { SeeMore } from '@/components/event-calendar/components/calendar'

export type EventListItemProps = {
  event: CalendarEventModel
  calendar: CalendarProps[]
  index: number
  onClick: (e: React.MouseEvent<HTMLButtonElement>, event: CalendarEventModel) => void
}

export function EventListItem({
  event,
  calendar,
  index,
  onClick
}: EventListItemProps): React.JSX.Element {
  const { disableDrag } = useEventState(event, calendar, index)

  if (disableDrag) {
    return <EventButton isExtended event={event} onClick={onClick} responsiveSize="dot" />
  }

  return (
    <MemoizedBaseEventItem
      key={event.id}
      onClick={onClick}
      index={index}
      event={event}
      calendar={calendar}
    />
  )
}

export type EventListProps = {
  data: CalendarProps
  index: number
  calendar: CalendarProps[]
}

export function EventList(props: EventListProps): React.JSX.Element {
  const { calendar, data, index } = props
  const { date } = data
  const { filteredEvents, handleUpdateEvent } = useEventListLogic(date)

  return (
    <div
      className={cn(
        'flex flex-col justify-between max-md:space-y-2 min-md:space-y-1 sm:min-h-12 md:min-h-22'
      )}
    >
      <div className="max-md:flex max-md:gap-1 max-md:items-start min-md:space-y-1">
        {filteredEvents.slice(MIN_VISIBLE_EVENTS, MAX_VISIBLE_EVENTS).map((event) => (
          <EventListItem
            key={event.id}
            event={event}
            calendar={calendar}
            index={index}
            onClick={handleUpdateEvent}
          />
        ))}
      </div>

      <SeeMore
        calendar={calendar}
        events={filteredEvents}
        date={date}
        onClick={handleUpdateEvent}
        index={index}
      />
    </div>
  )
}
