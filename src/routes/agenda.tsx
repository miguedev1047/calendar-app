import { AgendaGroupList } from '@/components/event-calendar/components/agenda'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/agenda')({
  component: RouteComponent
})

function RouteComponent(): React.JSX.Element {
  return (
    <div className="flex flex-1 flex-col space-y-4 h-full">
      <h2 className="text-2xl font-bold">Agenda</h2>
      <AgendaGroupList />
    </div>
  )
}
