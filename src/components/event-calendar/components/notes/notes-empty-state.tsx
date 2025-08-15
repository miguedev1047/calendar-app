import { FileText, Plus } from 'lucide-react'
import { RippleButton } from '@/components/animate-ui/buttons/ripple-button'
import { useNoteDialog } from '@/stores/use-note-dialog'

export function NotesEmptyState(): React.JSX.Element {
  const openNoteDialog = useNoteDialog((s) => s.openNoteDialog)

  const handleCreateNote = (): void => {
    openNoteDialog({ isOpen: true, mode: 'create' })
  }

  return (
    <div className="flex flex-col items-center justify-center h-96 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="size-16 rounded-full bg-muted flex items-center justify-center">
          <FileText className="size-8 text-muted-foreground" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">No notes yet</h3>
          <p className="text-muted-foreground max-w-sm">
            Start organizing your thoughts by creating your first note. You can write, format, and organize them however you like.
          </p>
        </div>
      </div>
      <RippleButton onClick={handleCreateNote} className="gap-2">
        <Plus className="size-4" />
        Create your first note
      </RippleButton>
    </div>
  )
}