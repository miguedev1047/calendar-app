import { useCalendar } from '@renderer/stores/use-calendar'
import { getMonthView } from '@renderer/components/event-calendar/helpers'
import { WeekList } from '@renderer/components/event-calendar'
import { SquareItem } from '@renderer/components/event-calendar'

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

