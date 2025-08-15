import { PlusIcon } from 'lucide-react'
import { RippleButton } from '@/components/animate-ui/buttons/ripple-button'
import { useHeaderLogic } from '@/components/header/hooks'
import { useLocation } from '@tanstack/react-router'

export function CreateButton(): React.JSX.Element {
  const { handleCreateEvent, handleCreateNote } = useHeaderLogic()
  const { pathname } = useLocation()

  const EVENTS_ROUTES = ['/', '/agenda']
  const isOnEventsRoutes = EVENTS_ROUTES.some((route) => pathname === route)
  const isOnNoteRoute = pathname === '/notes'

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {isOnEventsRoutes && (
        <RippleButton onClick={handleCreateEvent} className="gap-1 sm:gap-2">
          <PlusIcon className="size-3 sm:size-4" />
          <span className="hidden sm:inline">New event</span>
          <span className="sm:hidden">Event</span>
        </RippleButton>
      )}
      {isOnNoteRoute && (
        <RippleButton onClick={handleCreateNote} className="gap-1 sm:gap-2">
          <PlusIcon className="size-3 sm:size-4" />
          <span className="hidden sm:inline">New note</span>
          <span className="sm:hidden">Note</span>
        </RippleButton>
      )}
    </div>
  )
}