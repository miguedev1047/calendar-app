
import {
  getEventColor,
  getNormalColor,
  getShadowColor
} from '@renderer/components/event-calendar/utils'
import { EventButtonProps } from '@renderer/types'
import { useIsMobile } from '@renderer/hooks/use-mobile'
import { cn } from '@renderer/lib/utils'
import { addHours, addMinutes, format, getTime, startOfDay } from 'date-fns'
import { DEFAULT_START_HOUR } from '@renderer/components/event-calendar/constants'

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

  const now = new Date()
  const addTimeHour = addHours(startOfDay(startDate ?? now), startTime.hour)
  const addTimeMinute = addMinutes(addTimeHour, startTime?.minute)
  const time = format(getTime(addTimeMinute), 'h:mm aa')

  return (
    <button
      onClick={(e) => onClick?.(e, event)}
      className={cn(
        'flex items-center w-full h-6 p-1 text-left rounded relative',
        size === 'dot' && isMobile && getNormalColor(color),
        size === 'normal' && getEventColor(color),
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
          size === 'dot' && isMobile && "max-md:hidden"
        )}
      >
        <p className="font-bold line-clamp-1">{title}</p>
        <p className="flex flex-1 justify-end opacity-80 line-clamp-1">{time}</p>
      </h4>
    </button>
  )
}
