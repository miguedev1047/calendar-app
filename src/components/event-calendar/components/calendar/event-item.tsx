import { type CalendarEventModel } from '@/types'
import { type DraggableAttributes, useDraggable } from '@dnd-kit/core'
import { type Transform } from '@dnd-kit/utilities'
import { memo } from 'react'
import { EventButton } from '@/components/event-calendar/components/calendar/event-button'
import { useEventState } from '@/components/event-calendar/hooks'
import { type CalendarProps } from '@/components/event-calendar/types'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'

export const MemoizedBaseEventItem = memo(BaseEventItem)

export type EventItemWrapperProps = {
  children: React.ReactNode
  setNodeRef: (element: HTMLElement | null) => void
  attributes: DraggableAttributes
  listeners: SyntheticListenerMap | undefined
  transform: Transform | null
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

export type BaseEventItemProps = {
  event: CalendarEventModel
  calendar: CalendarProps[]
  index: number
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, event: CalendarEventModel) => void
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
