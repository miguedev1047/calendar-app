import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogClose
} from '@renderer/components/animate-ui/radix/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@renderer/components/ui/form'
import { useMemo, useTransition } from 'react'
import { Button } from '@renderer/components/ui/button'
import { useDialog } from '@renderer/stores/use-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@renderer/components/ui/input'
import { Textarea } from '@renderer/components/ui/textarea'
import { Trash2 } from 'lucide-react'
import { eventSchema, EventSchema } from '@shared/schemas'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { randomColor } from '@renderer/helpers/get-random-color'
import { ColorUndefined, DateUndefined, StringUndefined } from '@shared/types'
import { getDateFromCalendarData } from '@renderer/helpers/get-date-from-calendar'
import { DatePicker } from '@renderer/components/ui/date-picker'
import { formatUnixDate } from '@renderer/helpers/format-date'

export function EventDialog(): React.JSX.Element {
  const calendarData = useDialog((s) => s.calendarData)
  const openDialog = useDialog((s) => s.openDialog)
  const isOpen = useDialog((s) => s.isOpen)
  const isEditing = useDialog((s) => s.mode === 'edit')

  const handleClick = (): void => {
    openDialog({ isOpen: !isOpen, mode: 'create' })
  }

  const keyDate = formatUnixDate(calendarData?.date)

  return (
    <Dialog open={isOpen} onOpenChange={handleClick}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit event' : 'Create event'}</DialogTitle>
        </DialogHeader>

        <EventForm key={keyDate} />

        <DialogFooter className="sm:justify-between">
          <EventDelete />

          <div className="flex items-center gap-2 flex-1 justify-end">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button form="event-form" type="submit">
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function EventForm(): React.JSX.Element {
  const queryClient = useQueryClient()

  const calendarData = useDialog((s) => s.calendarData)
  const eventData = useDialog((s) => s.eventData)

  const isEditing = useDialog((s) => s.mode === 'edit')
  const closeDialog = useDialog((s) => s.closeDialog)

  const calendarDate = getDateFromCalendarData(calendarData)

  const defaultColor = useMemo(() => randomColor(), [])

  const form = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      id: isEditing ? eventData?.id : undefined,
      title: isEditing ? (eventData?.title as StringUndefined) : '',
      description: isEditing ? (eventData?.description as StringUndefined) : '',
      startDate: isEditing ? (eventData?.startDate as DateUndefined) : calendarDate,
      endDate: isEditing ? (eventData?.endDate as DateUndefined) : calendarDate,
      color: isEditing ? (eventData?.color as ColorUndefined) : defaultColor
    }
  })

  const isSubmitting = form.formState.isSubmitting

  const handleSubmit = form.handleSubmit(async (values) => {
    if (isSubmitting) return

    const action = isEditing ? window.api.updateEvent : window.api.createEvent
    const actionLabel = isEditing ? 'editing' : 'creating'

    const { ok } = await action(values)

    if (ok) {
      form.reset()
      closeDialog()
      toast.success(`Event ${isEditing ? 'edited' : 'created'} successfully!`)
      queryClient.invalidateQueries()
    } else {
      toast.error(`An error occurred while ${actionLabel} the event!`)
    }
  })

  return (
    <Form {...form}>
      <form id="event-form" onSubmit={handleSubmit} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} disabled={isSubmitting} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} disabled={isSubmitting} className="min-h-24 resize-none" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <DatePicker
                  form={form as never}
                  date={field.value}
                  onDateChange={field.onChange}
                  disabled={isSubmitting}
                  placeholder="Pick a start date"
                  mode="start"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <FormControl>
                <DatePicker
                  form={form as never}
                  date={field.value}
                  onDateChange={field.onChange}
                  disabled={isSubmitting}
                  placeholder="Pick a end date"
                  mode="end"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export function EventDelete(): React.JSX.Element | null {
  const [isPending, startTransition] = useTransition()
  const queryClient = useQueryClient()
  const eventData = useDialog((s) => s.eventData)
  const closeDialog = useDialog((s) => s.closeDialog)
  const isEditing = useDialog((s) => s.mode === 'edit')

  if (!isEditing) return null

  const handleDeleteEvent = (): void => {
    startTransition(async () => {
      if (!eventData?.id) return

      const { ok } = await window.api.deleteEvent({ id: eventData.id })

      if (ok) {
        toast.success('Event deleted successfully!')
        closeDialog()
        queryClient.invalidateQueries()
        return
      }

      toast.error('An ocurred a error while deleting event!')
    })
  }

  return (
    <Button size="icon" variant="outline" onClick={handleDeleteEvent} disabled={isPending}>
      <Trash2 />
    </Button>
  )
}
