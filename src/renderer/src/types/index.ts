import { DraggableAttributes } from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { EventSchema } from '@renderer/components/event-calendar'
import { CalendarProps } from '@renderer/components/event-calendar/types'
import { Transform } from '@dnd-kit/utilities'

export type CalendarEventModel = EventSchema

export type EventListProps = {
  data: CalendarProps
  index: number
  calendar: CalendarProps[]
}

export type EventListItemProps = {
  event: CalendarEventModel
  calendar: CalendarProps[]
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
  calendar: CalendarProps[]
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, event: CalendarEventModel) => void
}

export type BaseEventItemProps = {
  event: CalendarEventModel
  calendar: CalendarProps[]
  index: number
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, event: CalendarEventModel) => void
}

export type EventButtonProps = {
  event: CalendarEventModel
  isPastEvent?: boolean
  isExtended?: boolean
  isDraggable?: boolean
  responsiveSize: 'dot' | 'normal'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, event: CalendarEventModel) => void
}

export type EventItemWrapperProps = {
  children: React.ReactNode
  setNodeRef: (element: HTMLElement | null) => void
  attributes: DraggableAttributes
  listeners: SyntheticListenerMap | undefined
  transform: Transform | null
}
