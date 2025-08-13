import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { toast } from 'sonner'
import { useEvents } from '@renderer/stores/use-events'
import { CalendarEventModel } from '@renderer/types'
import { addDays, differenceInDays, format, getUnixTime, startOfDay } from 'date-fns'
import { useId, useState } from 'react'
import { EventButton } from '@renderer/components/event-calendar/components/calendar/event-button'
import { MIN_DAY_DIFF } from '@renderer/components/event-calendar/constants'


export function CalendarDndProvider({ children }: React.PropsWithChildren): React.JSX.Element {
  const [activeEvent, setActiveEvent] = useState<CalendarEventModel | null>(null)
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const DndContextId = useId()
  const updateEvent = useEvents((s) => s.updateEvent)

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const onDragStart = (event: DragStartEvent): void => {
    const { active } = event

    if (!active.data.current) {
      console.error('Missing data in drag start event', event)
      return
    }

    setActiveId(active.id)
    setActiveEvent(active.data.current as CalendarEventModel)
  }

  const onDragEnd = (event: DragEndEvent): void => {
    const { over, active } = event

    if (!over || !activeEvent) {
      console.error('Missing over or activeEvent in drag end event', event)
      return
    }

    if (over.data.current || active.data.current) {
      const originalStart = startOfDay(active.data.current?.startDate as Date)
      const originalEnd = startOfDay(active.data.current?.endDate as Date)
      const daysDif = differenceInDays(originalEnd, originalStart)

      const newStart = startOfDay(over.data.current as Date)
      const oldStart = startOfDay(active.data.current?.startDate as Date)

      if (getUnixTime(newStart) !== getUnixTime(oldStart)) {
        const newEnd = addDays(newStart, daysDif)

        const updatedEvent = { ...activeEvent, startDate: newStart, endDate: newEnd }

        toast(`Event "${updatedEvent.title}" moved!`, {
          description() {
            return (
              <p className="text-muted-foreground/80">
                {daysDif > MIN_DAY_DIFF
                  ? `${format(newStart, 'PPP')} → ${format(newEnd, 'PPP')}`
                  : `${format(newStart, 'PPP')}`}
              </p>
            )
          }
        })

        updateEvent({ ...updatedEvent })
      }
    }
  }

  return (
    <DndContext
      id={DndContextId}
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      {children}
      <DragOverlay adjustScale={false} dropAnimation={null}>
        {activeEvent && activeId && <EventButton responsiveSize='dot' event={activeEvent} />}
      </DragOverlay>
    </DndContext>
  )
}
