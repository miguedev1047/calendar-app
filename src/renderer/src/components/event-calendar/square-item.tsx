import { cn } from '@renderer/lib/utils'
import { useDialog } from '@renderer/stores/use-dialog'

import { DayItemProps } from '@renderer/types'
import { EventList } from '@renderer/components/event-calendar/event-list'

export function SquareItem(props: DayItemProps): React.JSX.Element {
  const { data } = props
  const { today, day } = data

  const openDialog = useDialog((s) => s.openDialog)

  const handleClick = (): void => {
    openDialog({ isOpen: true, calendar: data, mode: 'create' })
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'bg-background aspect-square p-2 space-y-1',
        'data-[active-month=true]:bg-muted/20 data-[active-month=false]:text-muted-foreground/80',
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
    </button>
  )
}
