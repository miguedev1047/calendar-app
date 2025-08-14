import { Skeleton } from '@/components/ui/skeleton'


export function EventLoading(): React.JSX.Element {
  return (
    <div>
      {[...Array(3)].map((_, index) => (
        <Skeleton key={index} className="h-4 w-fullrounded" />
      ))}
    </div>
  )
}
