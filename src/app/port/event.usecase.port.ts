
import { type Either } from '@/shared/errors/either'
import { type EventAppDto } from '../dto'

export interface EventUseCasePort {
  create: (input: EventAppDto) => Promise<Either<Error, boolean>>
  findAll: () => Promise<Either<Error, EventAppDto[]>>
}
