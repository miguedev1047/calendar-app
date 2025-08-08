import { EventActiveProps } from '@renderer/types'
import { getEventColor } from '@renderer/components/event-calendar/utils'
import { cn } from '@renderer/lib/utils'

export function PreviewEvent(props: EventActiveProps): React.JSX.Element {
  const { event, onClick } = props
  const { id, color, title } = event

  return (
    <button
      onClick={(e) => onClick?.(e, event)}
      key={id}
      className={cn(
        'flex items-center w-full h-6 p-1 text-left rounded relative',
        getEventColor(color)
      )}
    >
      <h4 className="text-xs line-clamp-1 font-semibold">{title}</h4>
    </button>
  )
}
