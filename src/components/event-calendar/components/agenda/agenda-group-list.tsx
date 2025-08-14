import { useEvents } from '@/stores/use-events'
import { getUnixTime } from 'date-fns'
import { AgendaGroupItem } from '@/components/event-calendar/components/agenda'
import { getUpcomingEventsByDate } from '@/components/event-calendar/helpers'
import { useCalendar } from '@/stores/use-calendar'
import { CalendarX } from 'lucide-react'
import { MotionEffect } from '@/components/animate-ui/effects/motion-effect'

export function AgendaGroupList(): React.JSX.Element {
  const month = useCalendar((s) => s.month)
  const year = useCalendar((s) => s.year)
  const events = useEvents((s) => s.events)
  const upcomingEvents = getUpcomingEventsByDate({ events, month, year })

  if (!upcomingEvents.length)
    return (
      <div className="flex flex-col items-center text-muted-foreground/80 justify-center space-y-2 h-40">
        <CalendarX className="size-8" />
        <h1 className="text-xl font-bold">No events scheduled for the selected month</h1>
      </div>
    )

  return (
    <div className="space-y-8 w-full relative">
      {upcomingEvents.map((item, index) => (
        <MotionEffect fade blur="10px" transition={{ duration: 0.5, ease: 'easeInOut' }} inView>
          <AgendaGroupItem key={getUnixTime(item.date)} {...item} />
        </MotionEffect>
      ))}
    </div>
  )
}
