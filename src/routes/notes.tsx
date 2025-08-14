import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/notes')({
  component: RouteComponent
})

function RouteComponent(): React.JSX.Element {
  return <div className="flex flex-1 h-full">Hello from Notes!</div>
}
