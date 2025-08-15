import {
  closestCorners,
  DndContext,
  DragOverlay,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { type CalendarNoteModel } from '@/types'
import { toast } from 'sonner'
import { useNotes } from '@/stores/use-notes'
import { useId, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { NoteItem } from '@/components/event-calendar/components/notes/note-item'

export function NoteDndProvider({ children }: React.PropsWithChildren): React.JSX.Element {
  const [activeNote, setActiveNote] = useState<CalendarNoteModel | null>(null)
  const setNotes = useNotes((s) => s.setNotes)
  const notes = useNotes((s) => s.notes)
  const notesIds = notes.map((note) => ({ id: note.id as UniqueIdentifier }))
  const getNote = useNotes((s) => s.getNoteById)
  const DndContextId = useId()

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  function handleDragStart(event: DragStartEvent) {
    const { active } = event
    const note = getNote(active.id as string)

    if (!note) {
      console.error('Note not found')
      return
    }

    setActiveNote(note)
  }

  const onDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event

    setActiveNote(null)

    if (!over || !active) {
      console.error('Missing over or active in drag event', event)
      return
    }

    if (active.id === over.id) {
      return
    }

    const oldIndex = notes.findIndex((note) => note.id === active.id)
    const newIndex = notes.findIndex((note) => note.id === over.id)

    if (oldIndex === -1 || newIndex === -1) {
      console.error('Could not find note indices', {
        oldIndex,
        newIndex,
        activeId: active.id,
        overId: over.id
      })
      return
    }

    const newArray = arrayMove(notes, oldIndex, newIndex)
    setNotes(newArray)
    toast.success('Notes reordered successfully!')
  }

  return (
    <DndContext
      id={DndContextId}
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={onDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext items={notesIds}>{children}</SortableContext>
      <DragOverlay adjustScale={false}>
        {activeNote && <NoteItem {...activeNote} />}
      </DragOverlay>
    </DndContext>
  )
}
