import { createFileRoute } from '@tanstack/react-router'
import { JSX } from 'react'

export const Route = createFileRoute('/day/day/$id')({
  component: RouteComponent
})

function RouteComponent(): JSX.Element {
  return <div>Hello /day/day/$id!</div>
}
