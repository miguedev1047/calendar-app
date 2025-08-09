import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@renderer/components/animate-ui/radix/popover'
import {
  CalendarEventModel,
  DisabledEventItemProps,
  EventListItemProps,
  EventListProps,
  SeeMoreProps
} from '@renderer/types'
import { MemoizedBaseEventItem } from '@renderer/components/event-calendar/event-item'
import { cn } from '@renderer/lib/utils'
import { useEvents } from '@renderer/stores/use-events'
import { filterEventsByDate } from '@renderer/helpers/filter-events'
import { format } from 'date-fns'
import { useDialog } from '@renderer/stores/use-dialog'
import { getEventColor, getNormalColor } from '@renderer/components/event-calendar/utils'
import { Button } from '@renderer/components/ui/button'
import { PreviewEvent } from '@renderer/components/event-calendar/preview-event'
import { useCallback, useMemo } from 'react'
import { useIsMobile } from '@renderer/hooks/use-mobile'

const MAX_VISIBLE_EVENTS = 3

export function useEventListLogic(date: Date): {
  filteredEvents: CalendarEventModel[]
  handleUpdateEvent: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    event: CalendarEventModel
  ) => void
} {
  const events = useEvents((s) => s.events)
  const openDialog = useDialog((s) => s.openDialog)

  const filteredEvents = useMemo(
    () => filterEventsByDate({ opts: { date, events } }),
    [date, events]
  )

  const handleUpdateEvent = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>, event: CalendarEventModel): void => {
      e.stopPropagation()
      openDialog({ isOpen: true, event, mode: 'edit' })
    },
    [openDialog]
  )

  return {
    filteredEvents,
    handleUpdateEvent
  }
}

export function DisabledEventItem({ event, onClick }: DisabledEventItemProps): React.JSX.Element {
  const isMobile = useIsMobile()

  return (
    <button
      key={event.id}
      onClick={(e) => onClick(e, event)}
      className={cn(
        'max-md:size-2 max-md:rounded-full flex items-center w-full h-6 p-1 text-left rounded relative',
        isMobile && getNormalColor(event.color),
        !isMobile && getEventColor(event.color)
      )}
    />
  )
}

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
    return <DisabledEventItem event={event} onClick={onClick} />
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

export function EventList(props: EventListProps): React.JSX.Element | null {
  const { calendar, data, index } = props
  const { date } = data

  const { filteredEvents, handleUpdateEvent } = useEventListLogic(date)
  const visibleEvents = filteredEvents.slice(0, MAX_VISIBLE_EVENTS)

  return (
    <div className={cn('flex flex-col justify-between max-md:space-y-2 min-md:space-y-1 sm:min-h-12 md:min-h-24')}>
      <div className="max-md:flex max-md:gap-1 max-md:items-start min-md:space-y-1">
        {visibleEvents.map((event) => (
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
              <PreviewEvent onClick={onClick} key={item.id} event={item} />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
