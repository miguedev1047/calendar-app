import { daysOfWeek } from '@shared/constants'


export function WeekList(): React.JSX.Element {
  return (
    <div className="grid grid-cols-7 gap-4">
      {daysOfWeek.map((item, index) => (
        <div key={index}>
          <p className="text-center uppercase text-xs text-muted-foreground">{item}</p>
        </div>
      ))}
    </div>
  )
}
