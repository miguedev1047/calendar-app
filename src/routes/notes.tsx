import { RenderNotes } from '@/components/event-calendar/components/shared/render-notes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/notes')({
  component: RouteComponent
})

function RouteComponent(): React.JSX.Element {
  return (
    <div className="space-y-4 w-full flex flex-1">
      <RenderNotes />
    </div>
  )
}
