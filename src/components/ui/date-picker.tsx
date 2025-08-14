import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/animate-ui/radix/popover'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { useForm, useWatch } from 'react-hook-form'
import { useEffect } from 'react'
import { isDateDisabled } from '@/helpers/date-disabled'
import { formatDate } from '@/helpers/format-date'

interface DatePickerProps {
  date?: Date
  onDateChange: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  form: ReturnType<typeof useForm>
  mode?: 'start' | 'end'
}

export function DatePicker(props: DatePickerProps): React.JSX.Element {
  const { date, form, disabled, mode = 'start', placeholder = 'Pick a date', onDateChange } = props

  const [startDate, endDate] = useWatch({
    control: form.control,
    name: ['startDate', 'endDate']
  })

  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      form.setValue('endDate', startDate)
    }
  }, [startDate, endDate, form])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatDate(date) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Calendar
          mode="single"
          className='w-full [&_[role=gridcell]]:rounded-md'
          selected={date}
          onSelect={onDateChange}
          disabled={(date) => isDateDisabled({ date, startDate, mode })}
        />
      </PopoverContent>
    </Popover>
  )
}
