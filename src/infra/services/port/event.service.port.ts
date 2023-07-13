import { type EventEntity } from '@/core/entities'
import { type Either } from '@/shared/errors/either'

interface EventCreated { id: number }
export interface EventServicePort {
  create: (input: EventEntity) => Promise<Either<Error, EventCreated>>
  findAll: () => Promise<Either<Error, EventEntity[]>>
}
