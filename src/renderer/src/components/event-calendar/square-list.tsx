import { getCalendar } from '@renderer/helpers/get-calendar'
import { useCalendar } from '@renderer/stores/use-calendar'
import { SquareItem } from '@renderer/components/event-calendar/square-item'
import { WeekList } from '@renderer/components/event-calendar/weeklist'
import { CalendarDndProvider } from '@renderer/components/event-calendar/calendar-dnd-provider'

export function SquareList(): React.JSX.Element {
  const month = useCalendar((s) => s.month)
  const year = useCalendar((s) => s.year)
  
  const calendar = getCalendar({ opts: { month, year } })

  const CELL_ITEMS = calendar.map((item, index) => (
    <SquareItem key={index} index={index} data={item} calendar={calendar} />
  ))

  return (
    <div className="space-y-4 flex-1">
      <WeekList />
      <CalendarDndProvider>
        <div className="grid grid-cols-7 rounded-2xl border overflow-hidden"> {CELL_ITEMS}</div>
      </CalendarDndProvider>
    </div>
  )
}
