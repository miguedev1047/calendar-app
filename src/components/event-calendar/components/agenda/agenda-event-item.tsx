import { type CalendarEventModel } from '@/types'
import { getEventTime } from '@/components/event-calendar/helpers/get-event-time'
import { cn } from '@/lib/utils'
import { getEventColor, isExpiredEvent } from '@/components/event-calendar/utils'
import { ClockIcon, TextIcon } from 'lucide-react'
import { useEventDialog } from '@/stores/use-event-dialog'

interface AgendaEventItemProps extends CalendarEventModel {}

export function AgendaEventItem(props: AgendaEventItemProps): React.JSX.Element {
  const { title, startDate, endDate, startTime, endTime, color, description } = props
  const openEventDialog = useEventDialog((s) => s.openEventDialog)
  const eventStartTime = getEventTime({ date: startDate, mode: 'start-time', startTime })
  const eventEndTime = getEventTime({ date: endDate, mode: 'end-time', endTime })
  const expiredEvent = isExpiredEvent({ date: endDate, endTime })

  const handleClick = (): void => {
    const event = { ...props }
    openEventDialog({ isOpen: true, mode: 'edit', event })
  }

  return (
    <button
      data-expired-event={expiredEvent}
      onClick={handleClick}
      className={cn(
        'w-full space-y-2 p-4 rounded-md text-sm cursor-pointer',
        'data-[expired-event=true]:line-through',
        getEventColor(color)
      )}
    >
      <h2 className="text-start font-semibold">{title}</h2>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <ClockIcon className="size-4" />
          <p className="font-semibold">
            <span>{eventStartTime}</span>
            <span> - </span>
            <span>{eventEndTime}</span>
          </p>
        </div>
        {description && (
          <div className="flex items-center gap-2">
            <TextIcon className="size-4" />
            <p className="font-semibold">{description}</p>
          </div>
        )}
      </div>
    </button>
  )
}
