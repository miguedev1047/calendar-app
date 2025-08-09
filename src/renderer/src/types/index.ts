import { DraggableAttributes } from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { EventSchema } from '@renderer/components/event-calendar'
import { CalendarStore } from '@renderer/helpers/get-calendar'
import { Transform } from '@dnd-kit/utilities'

export type CalendarEventModel = EventSchema

export type EventListProps = {
  data: CalendarStore
  index: number
  calendar: CalendarStore[]
}

export type DisabledEventItemProps = {
  event: CalendarEventModel
  onClick: (e: React.MouseEvent<HTMLButtonElement>, event: CalendarEventModel) => void
}

export type EventListItemProps = {
  event: CalendarEventModel
  calendar: CalendarStore[]
  index: number
  onClick: (e: React.MouseEvent<HTMLButtonElement>, event: CalendarEventModel) => void
}

export type EventActiveProps = {
  event: CalendarEventModel
  draggable?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, event: CalendarEventModel) => void
}

export type SeeMoreProps = {
  events: CalendarEventModel[]
  index: number
  date: Date
  calendar: CalendarStore[]
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, event: CalendarEventModel) => void
}

export type BaseEventItemProps = {
  event: CalendarEventModel
  calendar: CalendarStore[]
  index: number
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, event: CalendarEventModel) => void
}

export type EventButtonProps = {
  event: CalendarEventModel
  disabled: boolean
  isPastEvent: boolean
  isDragging?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, event: CalendarEventModel) => void
}

export type EventItemWrapperProps = {
  children: React.ReactNode
  setNodeRef: (element: HTMLElement | null) => void
  attributes: DraggableAttributes
  listeners: SyntheticListenerMap | undefined
  transform: Transform | null
}
