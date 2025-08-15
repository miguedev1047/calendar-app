import { RenderAgenda } from '@/components/event-calendar/components/shared'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/agenda')({
  component: RouteComponent
})

function RouteComponent(): React.JSX.Element {
  return (
    <div className="space-y-4 w-full flex flex-1">
      <RenderAgenda />
    </div>
  )
}
