import { type CalendarEventModel } from '@/types'
import { addDays, format, startOfDay } from 'date-fns'
import { AgendaEventList } from '@/components/event-calendar/components/agenda'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

export type AgendaGroupItemProps = {
  date: string
  events: CalendarEventModel[]
}

export function AgendaGroupItem(props: AgendaGroupItemProps): React.JSX.Element {
  const { date, events } = props
  const dateTitle = format(startOfDay(date), 'eeee, MMMM d, yyy')
  const isToday = format(addDays(startOfDay(new Date()), 1), 'yyyy-MM-dd') === date

  return (
    <div className="space-y-8 w-full">
      <div className="sticky top-24 flex items-center gap-4 bg-background py-2">
        <div className="flex items-center gap-2">
          {isToday && <Badge>Today</Badge>}
          <h2 className="font-semibold text-sm uppercase">{dateTitle}</h2>
        </div>
        <Separator className="flex-1" />
      </div>
      <AgendaEventList events={events} />
    </div>
  )
}
