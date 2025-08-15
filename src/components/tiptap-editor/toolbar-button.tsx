import { RippleButton } from '@/components/animate-ui/buttons/ripple-button'

interface ToolbarButtonProps {
  onClick: () => void
  isActive?: boolean
  children: React.ReactNode
  disabled?: boolean
  title: string
}

export function ToolbarButton({
  onClick,
  isActive = false,
  children,
  disabled = false,
  title
}: ToolbarButtonProps) {
  return (
    <RippleButton
      variant={isActive ? 'default' : 'ghost'}
      size="sm"
      type='button'
      onClick={onClick}
      disabled={disabled}
      className="h-8 w-8 p-0 transition-all duration-200"
      title={title}
    >
      {children}
    </RippleButton>
  )
}
