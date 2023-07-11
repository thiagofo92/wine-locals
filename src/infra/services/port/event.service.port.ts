import { type WineTourismEntity } from '@/core/entities'
import { type Either } from '@/shared/errors/either'

export interface EventSerivcePort {
  create: (input: WineTourismEntity) => Promise<Either<Error, boolean>>
  findAll: () => Promise<Either<Error, WineTourismEntity[]>>
}
