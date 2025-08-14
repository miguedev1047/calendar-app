import { getEventTime } from '@/components/event-calendar/helpers/get-event-time'
import { cn } from '@/lib/utils'
import { type CalendarEventModel } from '@/types'
import { getEventColor } from '@/components/event-calendar/utils'
import { ClockIcon, TextIcon } from 'lucide-react'
import { useDialog } from '@/stores/use-dialog'

interface AgendaEventItemProps extends CalendarEventModel {}

export function AgendaEventItem(props: AgendaEventItemProps): React.JSX.Element {
  const { title, startDate, endDate, startTime, endTime, color, description } = props

  const openDialog = useDialog((s) => s.openDialog)

  const handleClick = (): void => {
    openDialog({ isOpen: true, mode: 'edit', event: { ...props } })
  }

  return (
    <button
      onClick={handleClick}
      className={cn('w-full space-y-4 p-4 rounded-md text-sm cursor-pointer', getEventColor(color))}
    >
      <h2 className="text-start font-semibold">{title}</h2>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <ClockIcon className="size-4" />
          <p className="font-semibold">
            <span>{getEventTime({ date: startDate, mode: 'start-time', startTime, endTime })}</span>
            <span> - </span>
            <span>{getEventTime({ date: endDate, mode: 'end-time', startTime, endTime })}</span>
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
