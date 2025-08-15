import { RippleButton } from '@/components/animate-ui/buttons/ripple-button'
import { useHeaderLogic } from './hooks'

export function TodayButton(): React.JSX.Element {
  const { onGoToToday } = useHeaderLogic()

  return (
    <RippleButton onClick={onGoToToday} variant="outline" className="md:hidden">
      Today
    </RippleButton>
  )
}
