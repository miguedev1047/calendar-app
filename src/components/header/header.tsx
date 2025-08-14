import { ChevronLeft, ChevronRight, PlusIcon } from 'lucide-react'
import { SidebarTrigger } from '@/components/animate-ui/radix/sidebar'
import { Separator } from '@/components/ui/separator'
import { RippleButton } from '@/components/animate-ui/buttons/ripple-button'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { now } from '@/constants/index'
import { useHeaderLogic } from '@/components/header/hooks'
import type React from 'react'
import { useCalendar } from '@/stores/use-calendar'
import { useEvents } from '@/stores/use-events'
import { getUpcomingEventsByDate } from '../event-calendar/helpers'
import { Badge } from '../ui/badge'

export function Header(): React.JSX.Element {
  const { strDate, onNextMonth, onPrevMonth, onGoToToday, calendarDate, handleCreateEvent } =
    useHeaderLogic()

  return (
    <header className="flex app-region w-full p-4 sticky top-0 bg-background border-b px-4 shrink-0 items-center justify-between gap-2 z-50">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-12" />
        <div className="flex items-center gap-4">
          <div
            onClick={onGoToToday}
            className="flex flex-col size-16 border bg-card rounded-md overflow-hidden cursor-pointer"
          >
            <div className="flex-1 flex justify-center items-center bg-primary text-background">
              <p className="uppercase font-bold text-center">{format(now, 'MMM')}</p>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <p className="uppercase font-bold text-center">{format(now, 'd')}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">{strDate}</h2>
              <TotalEvents />
            </div>
            <div className="flex items-center gap-2">
              <RippleButton
                onClick={onPrevMonth}
                size="icon"
                className="size-6.5"
                variant="outline"
              >
                <ChevronLeft />
              </RippleButton>
              <div className="text-sm text-foreground/80">
                <span>{format(startOfMonth(calendarDate), 'MMM d yyy')}</span>
                <span> - </span>
                <span>{format(endOfMonth(calendarDate), 'MMM d yyy')}</span>
              </div>
              <RippleButton
                onClick={onNextMonth}
                size="icon"
                className="size-6.5"
                variant="outline"
              >
                <ChevronRight />
              </RippleButton>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <RippleButton onClick={handleCreateEvent}>
          <PlusIcon />
          <span> New event</span>
        </RippleButton>
      </div>
    </header>
  )
}

export function TotalEvents(): React.JSX.Element {
  const month = useCalendar((s) => s.month)
  const year = useCalendar((s) => s.year)
  const events = useEvents((s) => s.events)
  const upcomingEvents = getUpcomingEventsByDate({ events, month, year })
  return <Badge variant='outline'>{upcomingEvents.length} Events</Badge>
}
