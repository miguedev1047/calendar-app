import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogClose
} from '@/components/animate-ui/radix/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useNoteDialog } from '@/stores/use-note-dialog'
import { RippleButton } from '@/components/animate-ui/buttons/ripple-button'
import { TiptapEditor } from '@/components/tiptap-editor'
import { useNotes } from '@/stores/use-notes'
import { randomColor } from '@/helpers/get-random-color'
import { useMemo, useTransition } from 'react'
import { noteSchema, type NoteSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Trash2 } from 'lucide-react'
import { newDate } from '@/helpers/new-date'

export function NoteDialog(): React.JSX.Element {
  const noteData = useNoteDialog((s) => s.noteData)
  const openNoteDialog = useNoteDialog((s) => s.openNoteDialog)
  const isOpen = useNoteDialog((s) => s.isOpen)
  const isEditing = useNoteDialog((s) => s.mode === 'edit')
  const dataKey = noteData?.id ?? ''

  const handleClick = (): void => {
    openNoteDialog({ isOpen: !isOpen, mode: 'create' })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClick}>
      <DialogContent className="sm:max-w-[1040px] h-[80svh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>{isEditing ? 'Edit Note' : 'New Note'}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col flex-1 min-h-0">
          <NoteForm key={dataKey} />
        </div>

        <DialogFooter className="sm:justify-between">
          <NoteDelete />

          <div className="flex items-center gap-2 flex-1 justify-end">
            <DialogClose asChild>
              <RippleButton variant="outline">Cancel</RippleButton>
            </DialogClose>
            <RippleButton form="note-form" type="submit">
              Save
            </RippleButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function NoteForm(): React.JSX.Element {
  const notes = useNotes((s) => s.notes)
  const addNote = useNotes((s) => s.addNote)
  const updateNote = useNotes((s) => s.updateNote)
  const noteData = useNoteDialog((s) => s.noteData)
  const isEditing = useNoteDialog((s) => s.mode === 'edit')
  const closeNoteDialog = useNoteDialog((s) => s.closeNoteDialog)
  const defaultColor = useMemo(() => randomColor(), [])

  const getFieldValue = <T,>(field: keyof NoteSchema, fallback: T): T => {
    if (isEditing && noteData?.[field] !== undefined) {
      return noteData[field] as T
    }
    return fallback
  }

  const form = useForm<NoteSchema>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      id: getFieldValue('id', crypto.randomUUID()),
      order: getFieldValue('order', notes.length + 1),
      title: getFieldValue('title', `Note ${notes.length + 1}`),
      description: getFieldValue('description', `This is a note ${notes.length + 1}`),
      createdAt: newDate(getFieldValue('createdAt', new Date())),
      updatedAt: newDate(getFieldValue('updatedAt', new Date())),
      color: getFieldValue('color', defaultColor)
    }
  })

  const isSubmitting = form.formState.isSubmitting

  const handleSubmit = form.handleSubmit(async (values) => {
    if (isSubmitting) return
    const action = isEditing ? updateNote : addNote
    console.log(values)

    action(values)
    form.reset()
    closeNoteDialog()
    toast.success(`Note ${isEditing ? 'edited' : 'created'} successfully!`)
  })

  return (
    <Form {...form}>
      <form id="note-form" onSubmit={handleSubmit} className="flex flex-col h-full gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-shrink-0">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Note title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col flex-1 min-h-0">
              <FormLabel className="flex-shrink-0">Description</FormLabel>
              <FormControl className="flex flex-col flex-1 min-h-0">
                <TiptapEditor
                  placeholder="Note description"
                  content={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export function NoteDelete(): React.JSX.Element | null {
  const [isPending, startTransition] = useTransition()
  const noteData = useNoteDialog((s) => s.noteData)
  const closeNoteDialog = useNoteDialog((s) => s.closeNoteDialog)
  const isEditing = useNoteDialog((s) => s.mode === 'edit')
  const removeNote = useNotes((s) => s.removeNote)

  if (!isEditing) return null

  const handleDeleteEvent = (): void => {
    startTransition(async () => {
      if (!noteData?.id) return
      removeNote(noteData.id)
      toast.success('Note deleted successfully!')
      closeNoteDialog()
    })
  }

  return (
    <RippleButton size="icon" variant="outline" onClick={handleDeleteEvent} disabled={isPending}>
      <Trash2 />
    </RippleButton>
  )
}
