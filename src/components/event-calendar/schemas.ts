import { z } from 'zod'
import { TW_ENUMS } from './constants'

export const eventSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    startDate: z.date().optional(),
    startTime: z
      .object({ hour: z.number(), minute: z.number() }, { error: 'Start time is required' })
      .optional(),
    endDate: z.date().optional(),
    endTime: z
      .object({ hour: z.number(), minute: z.number() }, { error: 'End time is required' })
      .optional(),
    color: z.enum(TW_ENUMS).optional()
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate <= data.endDate
      } else {
        return true
      }
    },
    { error: 'Start date must be before end date', path: ['startDate'] }
  )
  .refine(
    (data) => {
      if (data.startTime && data.endTime) {
        return data.startTime.hour < data.endTime.hour
      } else {
        return true
      }
    },
    { error: 'Start time must be before end time', path: ['startTime'] }
  )

export type EventSchema = z.infer<typeof eventSchema>
