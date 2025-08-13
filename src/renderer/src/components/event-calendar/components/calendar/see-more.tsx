import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@renderer/components/animate-ui/radix/popover'
import { MAX_VISIBLE_EVENTS } from '@renderer/components/event-calendar/constants'
import { format } from 'date-fns'
import { Button } from '@renderer/components/ui/button'
import { EventButton } from '@renderer/components/event-calendar/components/calendar/event-button'
import { CalendarEventModel } from '@renderer/types'
import { CalendarProps } from '@renderer/components/event-calendar/types'

export type SeeMoreProps = {
  events: CalendarEventModel[]
  index: number
  date: Date
  calendar: CalendarProps[]
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, event: CalendarEventModel) => void
}

export function SeeMore(props: SeeMoreProps): React.JSX.Element | null {
  const { events, onClick, date } = props
  const totalEvents = events.length

  if (totalEvents <= MAX_VISIBLE_EVENTS) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          onClick={(e) => e.stopPropagation()}
          variant="ghost"
          className="h-6 w-full rounded justify-start p-1"
        >
          <p className="flex text-muted-foreground text-xs">
            +{totalEvents - MAX_VISIBLE_EVENTS} more...
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent onClick={(e) => e.stopPropagation()}>
        <div className="space-y-2 text-sm font-bold">
          <h2>{format(date, 'MMM dd')}</h2>

          <div className="space-y-1">
            {events.map((item) => (
              <EventButton responsiveSize="normal" onClick={onClick} key={item.id} event={item} />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
