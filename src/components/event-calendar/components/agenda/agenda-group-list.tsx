import { useEvents } from '@/stores/use-events'
import { getUnixTime } from 'date-fns'
import { AgendaGroupItem } from '@/components/event-calendar/components/agenda'
import { AgendaEmptyState } from '@/components/event-calendar/components/agenda'
import { getUpcomingEventsByDate } from '@/components/event-calendar/helpers'
import { useCalendar } from '@/stores/use-calendar'
import { MotionEffect } from '@/components/animate-ui/effects/motion-effect'

export function AgendaGroupList(): React.JSX.Element {
  const month = useCalendar((s) => s.month)
  const year = useCalendar((s) => s.year)
  const events = useEvents((s) => s.events)
  const upcomingEvents = getUpcomingEventsByDate({ events, month, year })

  if (!upcomingEvents.length) {
    return <AgendaEmptyState />
  }

  return (
    <div className="space-y-8 w-full relative">
      {upcomingEvents.map((item) => (
        <MotionEffect
          key={getUnixTime(item.date)}
          fade
          blur="10px"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          inView
        >
          <AgendaGroupItem {...item} />
        </MotionEffect>
      ))}
    </div>
  )
}
