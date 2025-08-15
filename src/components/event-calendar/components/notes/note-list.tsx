import { useNotes } from '@/stores/use-notes'
import { NoteDndProvider, NoteItem } from '@/components/event-calendar/components/notes'
import { NotesEmptyState } from '@/components/event-calendar/components/notes'
import { MotionEffect } from '@/components/animate-ui/effects/motion-effect'

export function NoteList(): React.JSX.Element {
  const notes = useNotes((s) => s.notes)

  if (!notes.length) {
    return <NotesEmptyState />
  }

  return (
    <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
      <NoteDndProvider>
        {notes.map((note) => (
          <MotionEffect
            key={note.id}
            fade
            blur="10px"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            inView
          >
            <NoteItem {...note} />
          </MotionEffect>
        ))}
      </NoteDndProvider>
    </ol>
  )
}
