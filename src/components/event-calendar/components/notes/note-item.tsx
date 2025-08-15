import type { CalendarNoteModel } from '@/types'
import { cn } from '@/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { RippleButton } from '@/components/animate-ui/buttons/ripple-button'
import { GripVertical, Edit } from 'lucide-react'
import { format, isValid } from 'date-fns'
import { useNoteDialog } from '@/stores/use-note-dialog'
import { getNormalColor } from '../../utils'

interface NoteItemProps extends CalendarNoteModel {
  isOver?: boolean
  isActive?: boolean
}

export function NoteItem(props: NoteItemProps): React.JSX.Element {
  const { title, description, id = crypto.randomUUID(), createdAt, updatedAt, color } = props
  const openNoteDialog = useNoteDialog((s) => s.openNoteDialog)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const handleEdit = (): void => {
    console.log('Edit note:', id)
    openNoteDialog({ isOpen: true, mode: 'edit', note: { ...props } })
  }

  const formatDate = (date: Date | undefined): string => {
    if (!date) return ''
    const dateObj = date instanceof Date ? date : new Date(date)
    return isValid(dateObj) ? format(dateObj, 'MMM d, yyyy') : ''
  }

  const getDisplayDate = (): string => {
    if (updatedAt) {
      const formattedDate = formatDate(updatedAt)
      return formattedDate ? `Updated ${formattedDate}` : ''
    }
    if (createdAt) {
      const formattedDate = formatDate(createdAt)
      return formattedDate ? `Created ${formattedDate}` : ''
    }
    return 'No date'
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-dragging={isDragging}
      className={cn(
        'bg-card border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200',
        'data-[dragging=true]:opacity-50'
      )}
    >
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <div
              {...attributes}
              {...listeners}
              className="flex-shrink-0 p-1 hover:bg-muted rounded cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="size-4 text-muted-foreground" />
            </div>

            <h3 className="font-semibold text-sm line-clamp-2 flex-1 min-w-0">
              {title || 'Untitled Note'}
            </h3>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <RippleButton size="icon" variant="ghost" onClick={handleEdit} className="size-8">
              <Edit className="size-3.5" />
            </RippleButton>
          </div>
        </div>

        {description && (
          <div className="text-sm text-muted-foreground line-clamp-3">
            {/* This is a partial solution. I recommend not doing this. This needs to be glossed over somehow. */}
            <p dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-2">
            {color && <div className={cn('size-2 rounded-full', getNormalColor(color))} />}
            <span>{getDisplayDate()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
