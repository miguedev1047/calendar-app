import { ChevronLeft, ChevronRight } from 'lucide-react'
import { RippleButton } from '@/components/animate-ui/buttons/ripple-button'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { now } from '@/constants/index'
import { useHeaderLogic } from '@/components/header/hooks'
import { TotalEvents } from '@/components/header'

export function CalendarNavigation(): React.JSX.Element {
  const { strDate, onNextMonth, onPrevMonth, handleGoToToday, calendarDate } = useHeaderLogic()

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <button
        onClick={handleGoToToday}
        className="hidden md:flex flex-col size-12 md:size-16 border bg-card rounded-md overflow-hidden cursor-pointer hover:shadow-sm transition-shadow"
      >
        <div className="flex-1 flex justify-center items-center bg-primary text-background">
          <p className="uppercase font-bold text-center text-xs md:text-sm">{format(now, 'MMM')}</p>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <p className="uppercase font-bold text-center text-sm md:text-base">{format(now, 'd')}</p>
        </div>
      </button>

      <div className="space-y-1 md:space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-sm md:text-base">{strDate}</h2>
          <TotalEvents className='hidden md:block' />
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <RippleButton
            onClick={onPrevMonth}
            size="icon"
            className="size-6 md:size-7"
            variant="outline"
          >
            <ChevronLeft className="size-3 md:size-4" />
          </RippleButton>
          <div className="text-xs md:text-sm text-foreground/80 px-1 md:px-2">
            <span className="hidden md:inline">
              {format(startOfMonth(calendarDate), 'MMM d yyy')}
            </span>
            <span className="hidden md:inline"> - </span>
            <span className="hidden md:inline">
              {format(endOfMonth(calendarDate), 'MMM d yyy')}
            </span>
            <span className="md:hidden">{format(calendarDate, 'MMM yyy')}</span>
          </div>
          <RippleButton
            onClick={onNextMonth}
            size="icon"
            className="size-6 md:size-7"
            variant="outline"
          >
            <ChevronRight className="size-3 md:size-4" />
          </RippleButton>
        </div>
      </div>
    </div>
  )
}
