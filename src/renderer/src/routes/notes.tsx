import { createFileRoute } from '@tanstack/react-router'
import { JSX } from 'react'

export const Route = createFileRoute('/notes')({
  component: RouteComponent,
})

function RouteComponent(): JSX.Element {
  return <div>Hello from Notes!</div>
}
