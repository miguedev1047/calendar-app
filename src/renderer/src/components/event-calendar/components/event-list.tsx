import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@renderer/components/animate-ui/radix/popover'
import {
  MAX_VISIBLE_EVENTS,
  MIN_VISIBLE_EVENTS
} from '@renderer/components/event-calendar/constants'
import { EventListItemProps, EventListProps, SeeMoreProps } from '@renderer/types'
import { MemoizedBaseEventItem } from '@renderer/components/event-calendar/components/event-item'
import { cn } from '@renderer/lib/utils'
import { format } from 'date-fns'
import { Button } from '@renderer/components/ui/button'
import { EventButton } from '@renderer/components/event-calendar/components/event-button'
import { useEventListLogic } from '@renderer/components/event-calendar/hooks'

export function EventListItem({
  event,
  calendar,
  index,
  onClick
}: EventListItemProps): React.JSX.Element {
  const currentCalendarDate = calendar[index]
  const currentDate = format(currentCalendarDate.date, 'yyyy-MM-dd')
  const eventStartDate = format(event.startDate!, 'yyyy-MM-dd')
  const isDisabled = eventStartDate !== currentDate

  if (isDisabled) {
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

export function EventList(props: EventListProps): React.JSX.Element {
  const { calendar, data, index } = props
  const { date } = data
  const { filteredEvents, handleUpdateEvent } = useEventListLogic(date)

  return (
    <div
      className={cn(
        'flex flex-col justify-between max-md:space-y-2 min-md:space-y-1 sm:min-h-12 md:min-h-24'
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

export function SeeMore(props: SeeMoreProps): React.JSX.Element | null {
  const { events, onClick, date } = props
  const totalEvents = events.length

  if (totalEvents <= MAX_VISIBLE_EVENTS) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          onClick={(e) => e.stopPropagation()}
          variant="ghost"
          className="h-6 w-full rounded justify-start p-1"
        >
          <p className="flex text-muted-foreground text-xs">
            +{totalEvents - MAX_VISIBLE_EVENTS} more...
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent onClick={(e) => e.stopPropagation()}>
        <div className="space-y-2 text-sm font-bold">
          <h2>{format(date, 'MMM dd')}</h2>

          <div className="space-y-1">
            {events.map((item) => (
              <EventButton responsiveSize="normal" onClick={onClick} key={item.id} event={item} />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
