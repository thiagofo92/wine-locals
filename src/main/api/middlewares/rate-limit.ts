import { MIN } from '@/shared/util/time'
import RateLimit from 'express-rate-limit'

export const rateLimit = RateLimit({
  max: 20,
  windowMs: MIN * 1
})
