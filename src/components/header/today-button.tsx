import { RippleButton } from '@/components/animate-ui/buttons/ripple-button'
import { useHeaderLogic } from './hooks'

export function TodayButton(): React.JSX.Element {
  const { handleGoToToday } = useHeaderLogic()

  return (
    <RippleButton onClick={handleGoToToday} variant="outline" className="md:hidden">
      Today
    </RippleButton>
  )
}
