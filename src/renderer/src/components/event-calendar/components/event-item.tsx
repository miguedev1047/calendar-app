import { BaseEventItemProps, EventItemWrapperProps } from '@renderer/types'
import { useDraggable } from '@dnd-kit/core'
import { memo } from 'react'
import { EventButton } from '@renderer/components/event-calendar/components/event-button'
import { useEventState } from '@renderer/components/event-calendar/hooks'

export const MemoizedBaseEventItem = memo(BaseEventItem)

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

export function BaseEventItem(props: BaseEventItemProps): React.JSX.Element {
  const { event, calendar, index, onClick } = props
  const { disableDrag, isPastEvent } = useEventState(event, calendar, index)

  const { setNodeRef, attributes, listeners, transform, isDragging } = useDraggable({
    id: event.id!,
    data: { ...event },
    disabled: disableDrag
  })

  return (
    <EventItemWrapper
      attributes={attributes}
      listeners={listeners}
      setNodeRef={setNodeRef}
      transform={transform}
    >
      <EventButton
        event={event}
        isPastEvent={isPastEvent}
        onClick={onClick}
        isDraggable={isDragging}
        responsiveSize="dot"
      />
    </EventItemWrapper>
  )
}
