import { CalendarX, Plus } from 'lucide-react'
import { RippleButton } from '@/components/animate-ui/buttons/ripple-button'
import { useEventDialog } from '@/stores/use-event-dialog'

export function AgendaEmptyState(): React.JSX.Element {
  const openEventDialog = useEventDialog((s) => s.openEventDialog)

  const handleCreateEvent = (): void => {
    openEventDialog({ isOpen: true, mode: 'create' })
  }

  return (
    <div className="flex flex-col items-center justify-center h-96 space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="size-16 rounded-full bg-muted flex items-center justify-center">
          <CalendarX className="size-8 text-muted-foreground" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">No upcoming events</h3>
          <p className="text-muted-foreground max-w-sm">
            You don't have any events scheduled for the upcoming days. Create your first event to start organizing your schedule.
          </p>
        </div>
      </div>
      <RippleButton onClick={handleCreateEvent} className="gap-2">
        <Plus className="size-4" />
        Create your first event
      </RippleButton>
    </div>
  )
}