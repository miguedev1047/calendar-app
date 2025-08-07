import { formatUnixDate } from '@renderer/helpers/format-date'
import { CalendarStore } from '@renderer/helpers/get-calendar'
import { getEventColor } from '@renderer/helpers/get-event-color'
import { cn } from '@renderer/lib/utils'
import { CalendarEventModel } from '@shared/types'

interface EventItemProps {
  event: CalendarEventModel
  calendar: CalendarStore[]
}

export function EventItem(props: EventItemProps): React.JSX.Element {
  const { event } = props
  const { startDate, title, color } = event

  const unixStartDate = formatUnixDate(startDate ?? new Date())
  const todayDate = formatUnixDate(new Date())

  return (
    <button
      className={cn(
        getEventColor(color),
        'flex items-center overflow-hidden not-visited:w-full h-6 p-1 text-left rounded relative'
      )}
    >
      <h4
        data-past-date={unixStartDate < todayDate}
        className={cn('text-xs line-clamp-1 font-semibold', 'data-[past-date=true]:line-through')}
      >
        {title}
      </h4>
    </button>
  )
}
