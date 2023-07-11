import { type EventEntity } from '@/core/entities'
import { type Either } from '@/shared/errors/either'

export interface EventSerivcePort {
  create: (input: EventEntity) => Promise<Either<Error, boolean>>
  findAll: () => Promise<Either<Error, EventEntity[]>>
}
