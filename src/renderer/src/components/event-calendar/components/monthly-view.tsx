import { useCalendar } from '@renderer/stores/use-calendar'
import { getMonthView } from '../helpers'
import { WeekList } from './weeklist'
import { EventList } from './event-list'
import { useDialog } from '@renderer/stores/use-dialog'
import { format } from 'date-fns'
import { useDroppable } from '@dnd-kit/core'
import { cn } from '@renderer/lib/utils'
import { EventListProps } from '@renderer/types'

export function MonthlyView(): React.JSX.Element {
  const month = useCalendar((s) => s.month)
  const year = useCalendar((s) => s.year)
  const monthCalendar = getMonthView({ opts: { month, year } })

  const MONTH_CELL_ITEMS = monthCalendar.map((item, index) => (
    <SquareItem key={index} index={index} data={item} calendar={monthCalendar} />
  ))

  return (
    <div className="space-y-4 flex-1">
      <WeekList />
      <div className="grid grid-cols-7 rounded-2xl border overflow-hidden"> {MONTH_CELL_ITEMS}</div>
    </div>
  )
}

export function SquareItem(props: EventListProps): React.JSX.Element {
  const { data } = props
  const { today, date, day, inCurrentMonth } = data

  const openDialog = useDialog((s) => s.openDialog)

  const { setNodeRef, isOver } = useDroppable({
    id: `${format(date, 'yyyy-MM-dd')}`,
    data: data.date
  })

  const handleClick = (): void => {
    openDialog({ isOpen: true, calendar: data, mode: 'create' })
  }

  return (
    <div
      ref={setNodeRef}
      data-current-month={inCurrentMonth}
      data-last-col={isOver}
      data-over={isOver}
      onClick={handleClick}
      className={cn(
        'bg-background max-md:p-1 min-md:p-2 space-y-1',
        'data-[current-month=false]:bg-muted/20 data-[current-month=false]:text-muted-foreground/80',
        'data-[over=true]:bg-accent data-[over=true]:text-accent-foreground',
        'data-[last-col=false]:border-r',
        'data-[last-col=false]:border-b'
      )}
    >
      <div
        data-today={today}
        className={cn(
          'data-[today=true]:bg-primary data-[today=true]:text-primary-foreground',
          'mt-1 inline-flex size-6 items-center justify-center rounded-full text-sm'
        )}
      >
        <h2>{day}</h2>
      </div>
      <EventList {...props} />
    </div>
  )
}
