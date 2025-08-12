import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogClose
} from '@renderer/components/animate-ui/radix/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@renderer/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import {
  DEFAULT_END_HOUR,
  DEFAULT_START_HOUR,
  TW_NORMAL_COLORS
} from '@renderer/components/event-calendar/constants'
import { useMemo, useTransition } from 'react'
import { useDialog } from '@renderer/stores/use-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@renderer/components/ui/input'
import { Textarea } from '@renderer/components/ui/textarea'
import { AlertCircleIcon, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { randomColor } from '@renderer/helpers/get-random-color'
import { getDateFromCalendarData } from '@renderer/helpers/get-date-from-calendar'
import { DatePicker } from '@renderer/components/ui/date-picker'
import { formatUnixDate } from '@renderer/helpers/format-date'
import { useEvents } from '@renderer/stores/use-events'
import { cn } from '@renderer/lib/utils'
import { eventSchema, EventSchema } from '@renderer/components/event-calendar/schemas'
import { RippleButton } from '@renderer/components/animate-ui/buttons/ripple-button'
import { TimeInput } from '@renderer/components/ui/time-input'
import { TimeValue } from 'react-aria-components'
import { Alert, AlertTitle } from '@renderer/components/ui/alert'

export function EventDialog(): React.JSX.Element {
  const calendarData = useDialog((s) => s.calendarData)
  const openDialog = useDialog((s) => s.openDialog)
  const isOpen = useDialog((s) => s.isOpen)
  const isEditing = useDialog((s) => s.mode === 'edit')
  const keyDate = formatUnixDate(calendarData?.date)

  const handleClick = (): void => {
    openDialog({ isOpen: !isOpen, mode: 'create' })
  }

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
              <RippleButton variant="outline">Cancel</RippleButton>
            </DialogClose>
            <RippleButton form="event-form" type="submit">
              Save
            </RippleButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function EventForm(): React.JSX.Element {
  const addEvent = useEvents((s) => s.addEvent)
  const updateEvent = useEvents((s) => s.updateEvent)
  const calendarData = useDialog((s) => s.calendarData)
  const eventData = useDialog((s) => s.eventData)
  const isEditing = useDialog((s) => s.mode === 'edit')
  const closeDialog = useDialog((s) => s.closeDialog)
  const calendarDate = getDateFromCalendarData(calendarData)
  const defaultColor = useMemo(() => randomColor(), [])

  const getField = <T,>(field: keyof EventSchema, fallback: T): T =>
    isEditing ? ((eventData?.[field] as T) ?? fallback) : fallback

  const form = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      id: getField('id', crypto.randomUUID()),
      title: getField('title', '(no title)'),
      description: getField('description', ''),
      startTime: getField('startTime', DEFAULT_START_HOUR),
      endTime: getField('endTime', DEFAULT_END_HOUR),
      startDate: new Date(getField('startDate', calendarDate)),
      endDate: new Date(getField('endDate', calendarDate)),
      color: getField('color', defaultColor)
    }
  })

  const isSubmitting = form.formState.isSubmitting

  const handleSubmit = form.handleSubmit(async (values) => {
    if (isSubmitting) return
    const action = isEditing ? updateEvent : addEvent
    action(values)
    form.reset()
    closeDialog()
    toast.success(`Event ${isEditing ? 'edited' : 'created'} successfully!`)
  })

  return (
    <Form {...form}>
      <form id="event-form" onSubmit={handleSubmit} className="grid gap-4 py-4">
        {form.formState.errors.startTime && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{form.formState.errors.startTime.message}</AlertTitle>
          </Alert>
        )}

        {form.formState.errors.startDate && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{form.formState.errors.startDate.message}</AlertTitle>
          </Alert>
        )}

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
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="w-full">
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
            name="startTime"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <TimeInput
                    value={field.value as TimeValue}
                    onChange={field.onChange}
                    hourCycle={12}
                    data-invalid={fieldState.invalid}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="w-full">
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
          <FormField
            control={form.control}
            name="endTime"
            render={({ field, fieldState }) => (
              <FormItem className="flex-1">
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <TimeInput
                    value={field.value as TimeValue}
                    onChange={field.onChange}
                    hourCycle={12}
                    data-invalid={fieldState.invalid}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colors</FormLabel>
              <Select value={field.value} onValueChange={field.onChange} disabled={isSubmitting}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pick a color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Colors</SelectLabel>
                    {TW_NORMAL_COLORS.map((item) => (
                      <SelectItem key={item.key} value={item.key}>
                        <div className={cn('size-4 rounded-full', item.value)} />
                        <span className="capitalize">{item.key.toLowerCase()}</span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export function EventDelete(): React.JSX.Element | null {
  const [isPending, startTransition] = useTransition()
  const eventData = useDialog((s) => s.eventData)
  const closeDialog = useDialog((s) => s.closeDialog)
  const isEditing = useDialog((s) => s.mode === 'edit')
  const removeEvent = useEvents((s) => s.removeEvent)

  if (!isEditing) return null

  const handleDeleteEvent = (): void => {
    startTransition(async () => {
      if (!eventData?.id) return
      removeEvent(eventData.id)
      toast.success('Event deleted successfully!')
      closeDialog()
    })
  }

  return (
    <RippleButton size="icon" variant="outline" onClick={handleDeleteEvent} disabled={isPending}>
      <Trash2 />
    </RippleButton>
  )
}
