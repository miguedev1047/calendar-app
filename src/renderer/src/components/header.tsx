import { ChevronLeft, ChevronRight, Maximize, Minus, X } from 'lucide-react'
import { SidebarTrigger } from '@renderer/components/animate-ui/radix/sidebar'
import { Separator } from '@renderer/components/ui/separator'
import { useCalendar } from '@renderer/stores/use-calendar'
import { RippleButton } from '@renderer/components/animate-ui/buttons/ripple-button'

export function Header(): React.JSX.Element {
  const strDate = useCalendar((s) => s.strDate())
  const onNextMonth = useCalendar((s) => s.nextMonth)
  const onPrevMonth = useCalendar((s) => s.prevMonth)
  const onGoToToday = useCalendar((s) => s.goToToday)
  const closeWindow = (): void => window.api.closeWindow()
  const minimizeWindow = (): void => window.api.minimizeWindow()
  const toggleMaximizeWindow = (): void => window.api.toggleMaximizeWindow()

  return (
    <header className="flex app-region w-full h-16 sticky top-0 bg-background border-b px-4 shrink-0 items-center justify-between gap-2 z-50 [&>*]:app-no-region">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />

        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />

        <RippleButton onClick={onGoToToday} variant="outline">
          Today
        </RippleButton>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <h3 className="font-bold">{strDate}</h3>
          <div className="flex items-center">
            <RippleButton onClick={onPrevMonth} variant="ghost" size="icon">
              <ChevronLeft />
            </RippleButton>
            <RippleButton onClick={onNextMonth} variant="ghost" size="icon">
              <ChevronRight />
            </RippleButton>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <RippleButton onClick={minimizeWindow} size="icon" variant="outline">
            <Minus />
          </RippleButton>
          <RippleButton onClick={toggleMaximizeWindow} size="icon" variant="outline">
            <Maximize />
          </RippleButton>
          <RippleButton onClick={closeWindow} size="icon" variant="outline">
            <X />
          </RippleButton>
        </div>
      </div>
    </header>
  )
}
