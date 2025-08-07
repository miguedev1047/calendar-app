import { Link } from '@tanstack/react-router'

import { SidebarTrigger } from '@renderer/components/animate-ui/radix/sidebar'
import { Separator } from '@renderer/components/ui/separator'
import { Button } from '@renderer/components/ui/button'
import { useCalendar } from '@renderer/stores/use-calendar'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Header(): React.JSX.Element {
  const strDate = useCalendar((s) => s.strDate())

  const onNextMonth = useCalendar((s) => s.nextMonth)
  const onPrevMonth = useCalendar((s) => s.prevMonth)
  const onGoToToday = useCalendar((s) => s.goToToday)

  return (
    <header className="flex app-region w-full h-16 sticky top-0 bg-background border-b px-4 shrink-0 items-center justify-between gap-2 z-50 [&>*]:app-no-region">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />

        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />

        <div className="flex items-center gap-4">
          <Button onClick={onGoToToday} variant="outline">
            Today
          </Button>
          <div>
            <Button onClick={onPrevMonth} variant="ghost" size="icon">
              <ChevronLeft />
            </Button>
            <Button onClick={onNextMonth} variant="ghost" size="icon">
              <ChevronRight />
            </Button>
          </div>
          <h3 className='font-bold'>{strDate}</h3>
        </div>
      </div>

      <div className="flex gap-4">
        <Link to="/" className="[&.active]:font-bold">
          Calendar
        </Link>

        <Link to="/notes" className="[&.active]:font-bold">
          Notes
        </Link>
      </div>
    </header>
  )
}
