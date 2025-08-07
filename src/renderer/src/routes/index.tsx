import type { JSX } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { EventDialog } from '@renderer/components/event-calendar/event-dialog'
import { SquareList } from '@renderer/components/event-calendar/square-list'

export const Route = createFileRoute('/')({
  component: Index
})

function Index(): React.JSX.Element {

  return (
    <div className="space-y-4 w-full flex flex-1">
      <SquareList/>
      <EventDialog />
    </div>
  )
}
