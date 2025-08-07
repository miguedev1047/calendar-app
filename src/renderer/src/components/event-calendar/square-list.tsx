import { getCalendar } from '@renderer/helpers/get-calendar'
import { useCalendar } from '@renderer/stores/use-calendar'
import { SquareItem } from '@renderer/components/event-calendar/square-item'
import { WeekList } from '@renderer/components/event-calendar/weeklist'

export function SquareList(): React.JSX.Element {
  const month = useCalendar((s) => s.month)
  const year = useCalendar((s) => s.year)
  const calendar = getCalendar({ opts: { month, year } })

  const RENDER_CALENDAR = calendar.map((item, index) => (
    <SquareItem
      key={index}
      data-id={`item-${index}`}
      index={index}
      data={item}
      calendar={calendar}
    />
  ))

  return (
    <div className="space-y-4 flex-1">
      <WeekList />
       <div className="grid grid-cols-7 rounded-2xl border overflow-hidden">{RENDER_CALENDAR}</div>
    </div>
  )
}
