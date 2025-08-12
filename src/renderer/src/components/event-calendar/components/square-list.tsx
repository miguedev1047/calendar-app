import { useCalendar } from '@renderer/stores/use-calendar'
import { CalendarDndProvider } from '@renderer/components/event-calendar/components/calendar-dnd-provider'
import { MonthlyView } from '@renderer/components/event-calendar/components/monthly-view'

export function SquareList(): React.JSX.Element {
  const view = useCalendar((s) => s.view)

  return (
    <div className="space-y-4 flex-1">
      <CalendarDndProvider>
        {view === 'month' && <MonthlyView />}
      </CalendarDndProvider>
    </div>
  )
}
