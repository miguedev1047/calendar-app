import { type CalendarEventModel } from '@/types'
import { getEventColor, getNormalColor, getShadowColor } from '@/components/event-calendar/utils/'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { DEFAULT_START_HOUR } from '@/components/event-calendar/constants'
import { getEventTime } from '@/components/event-calendar/helpers'

export type EventButtonProps = {
  event: CalendarEventModel
  isPastEvent?: boolean
  isExtended?: boolean
  isDraggable?: boolean
  responsiveSize: 'dot' | 'normal'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, event: CalendarEventModel) => void
}

export function EventButton({
  event,
  onClick,
  responsiveSize: size = 'normal',
  isPastEvent = false,
  isDraggable = false,
  isExtended = false
}: EventButtonProps): React.JSX.Element {
  const { title, color, startDate, startTime = DEFAULT_START_HOUR } = event
  const isMobile = useIsMobile()
  const time = getEventTime({ date: startDate, mode: 'start-time', startTime })

  return (
    <button
      onClick={(e) => onClick?.(e, event)}
      className={cn(
        'flex items-center w-full h-6 p-1 text-left rounded relative select-none',
        size === 'normal' && getEventColor(color),
        size === 'dot' && isMobile && getNormalColor(color),
        size === 'dot' && isMobile && 'max-md:size-2 max-md:rounded-full max-md:p-0',
        !isMobile && getEventColor(color),
        isDraggable && getShadowColor(color)
      )}
    >
      <h4
        data-expired-event={isPastEvent}
        data-extended={isExtended}
        className={cn(
          'text-xs w-full flex items-center data-[expired-event=true]:line-through data-[extended=true]:hidden',
          size === 'dot' && isMobile && 'max-md:hidden'
        )}
      >
        <p className="font-bold line-clamp-1">{title}</p>
        <p className="hidden flex-1 justify-end opacity-80 truncate xl:flex">{time}</p>
      </h4>
    </button>
  )
}
