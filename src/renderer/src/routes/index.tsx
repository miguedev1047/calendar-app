import { createFileRoute } from '@tanstack/react-router'
import { RenderCalendar } from '@renderer/components/event-calendar/components/render-calendar'

export const Route = createFileRoute('/')({
  component: Index
})

function Index(): React.JSX.Element {
  return (
    <div className="space-y-4 w-full flex flex-1">
      <RenderCalendar />
    </div>
  )
}
