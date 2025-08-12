import { cn } from '@renderer/lib/utils'
import { useDialog } from '@renderer/stores/use-dialog'
import { EventListProps } from '@renderer/types'
import { EventList } from '@renderer/components/event-calendar/components/event-list'
import { useDroppable } from '@dnd-kit/core'
import { format } from 'date-fns'

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
