import { AgendaRender } from '@/components/event-calendar/components/shared'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/agenda')({
  component: RouteComponent
})

function RouteComponent(): React.JSX.Element {
  return (
    <div>
      <AgendaRender />
    </div>
  )
}
