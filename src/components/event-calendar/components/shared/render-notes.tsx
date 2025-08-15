import { NoteList } from '@/components/event-calendar/components/notes'

export function RenderNotes(): React.JSX.Element {
  return (
    <div className="flex flex-1 flex-col space-y-4 h-full">
      <NoteList />
    </div>
  )
}
