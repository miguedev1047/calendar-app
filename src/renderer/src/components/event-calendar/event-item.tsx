import {
  BaseEventItemProps,
  CalendarEventModel,
  EventButtonProps,
  EventItemWrapperProps
} from '@renderer/types'
import { useDraggable } from '@dnd-kit/core'
import { formatUnixDate } from '@renderer/helpers/format-date'
import { cn } from '@renderer/lib/utils'
import { format } from 'date-fns'
import {
  getEventColor,
  getNormalColor,
  getShadowColor
} from '@renderer/components/event-calendar/utils'
import { memo } from 'react'
import { CalendarStore } from '@renderer/helpers/get-calendar'
import { useIsMobile } from '@renderer/hooks/use-mobile'

export const MemoizedBaseEventItem = memo(BaseEventItem)

function useEventState(
  event: CalendarEventModel,
  calendar: CalendarStore[],
  index: number
): {
  disabled: boolean
  isPastEvent: boolean
} {
  const { startDate } = event
  const currentCalendarDate = calendar[index]
  const currentDate = format(currentCalendarDate.date, 'yyyy-MM-dd')
  const eventStartDate = format(startDate!, 'yyyy-MM-dd')
  const disabled = eventStartDate !== currentDate
  const unixStartDate = formatUnixDate(startDate ?? new Date())
  const todayDate = formatUnixDate(new Date())
  const isPastEvent = unixStartDate < todayDate
  return { disabled, isPastEvent }
}

export function EventItemWrapper(props: EventItemWrapperProps): React.JSX.Element {
  const { children, attributes, listeners, setNodeRef, transform } = props

  const styles = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined
  }

  return (
    <div ref={setNodeRef} style={styles} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

export function EventButton({
  event,
  disabled = false,
  isPastEvent = false,
  isDragging,
  onClick
}: EventButtonProps): React.JSX.Element {
  const { title, color } = event
  const isMobile = useIsMobile()

  return (
    <button
      onClick={(e) => onClick?.(e, event)}
      disabled={disabled}
      className={cn(
        'max-md:size-2 max-md:rounded-full flex items-center w-full h-6 p-1 text-left rounded relative max-md:p-0',
        isMobile && getNormalColor(color),
        !isMobile && getEventColor(color),
        isDragging && getShadowColor(color)
      )}
    >
      <h4
        data-past-date={isPastEvent}
        data-hidden={disabled}
        className={cn(
          'text-xs line-clamp-1 font-semibold max-md:hidden',
          'data-[past-date=true]:line-through data-[hidden=true]:hidden'
        )}
      >
        {title}
      </h4>
    </button>
  )
}

export function BaseEventItem(props: BaseEventItemProps): React.JSX.Element {
  const { event, calendar, index, onClick } = props

  const { disabled, isPastEvent } = useEventState(event, calendar, index)

  const { setNodeRef, attributes, listeners, transform, isDragging } = useDraggable({
    id: event.id!,
    data: { ...event },
    disabled
  })

  const eventButtonProps = {
    event,
    disabled,
    isPastEvent,
    onClick
  }

  return (
    <EventItemWrapper
      attributes={attributes}
      listeners={listeners}
      setNodeRef={setNodeRef}
      transform={transform}
    >
      <EventButton {...eventButtonProps} isDragging={isDragging} />
    </EventItemWrapper>
  )
}
