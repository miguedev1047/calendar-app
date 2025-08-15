import type React from 'react'
import { SidebarTrigger } from '@/components/animate-ui/radix/sidebar'
import { Separator } from '@/components/ui/separator'
import { CalendarNavigation } from '@/components/header'
import { CreateButton } from '@/components/header'
import { TotalEvents } from '@/components/header'
import { ThemeToggle } from '@/components/header'
import { TodayButton } from '@/components/header'

export function Header(): React.JSX.Element {
  return (
    <header className="flex app-region w-full p-4 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-2 sm:px-4 shrink-0 items-center justify-between gap-2 sm:gap-4 z-50">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
        <SidebarTrigger className="-ml-1 size-8 sm:size-9" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-10 sm:data-[orientation=vertical]:h-14" />
        <CalendarNavigation />
      </div>

      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        <div className="sm:hidden">
          <TotalEvents />
        </div>
        <TodayButton />
        <CreateButton />
        <ThemeToggle />
      </div>
    </header>
  )
}
