import { type CalendarEventModel } from '@/types'
import { format, startOfDay } from 'date-fns'
import { AgendaEventList } from '@/components/event-calendar/components/agenda'

export type AgendaGroupItemProps = {
  date: string
  events: CalendarEventModel[]
}

export function AgendaGroupItem(props: AgendaGroupItemProps): React.JSX.Element {
  const { date, events } = props

  return (
    <div className="space-y-8 w-full ">
      <div className="sticky top-24 flex items-center gap-4 bg-background py-2">
        <h2 className="font-semibold text-sm">{format(startOfDay(date), 'eeee, MMMM d, yyy')}</h2>
      </div>

      <AgendaEventList events={events} />
    </div>
  )
}