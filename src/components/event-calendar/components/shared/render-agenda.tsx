import { AgendaGroupList } from '@/components/event-calendar/components/agenda'

export function RenderAgenda(): React.JSX.Element {
  return (
    <div className="flex flex-1 flex-col space-y-4 h-full">
      <AgendaGroupList />
    </div>
  )
}
