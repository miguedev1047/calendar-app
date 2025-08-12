import { createFileRoute } from '@tanstack/react-router'
import { EventDialog } from '@renderer/components/event-calendar/components/event-dialog'
import { SquareList } from '@renderer/components/event-calendar/components/square-list'

export const Route = createFileRoute('/')({
  component: Index
})

function Index(): React.JSX.Element {
  return (
    <div className="space-y-4 w-full flex flex-1">
      <SquareList />
      <EventDialog />
    </div>
  )
}
