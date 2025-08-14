import { AgendaRender } from '@/components/event-calendar/components/agenda'
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
