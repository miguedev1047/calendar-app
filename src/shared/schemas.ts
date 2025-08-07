import { z } from 'zod'
import { TW_ENUMS } from './constants'

export const eventSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    startDate: z.date().optional(),
    startTime: z.string().optional(),
    endDate: z.date(),
    endTime: z.string().optional(),
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

export type EventSchema = z.infer<typeof eventSchema>
