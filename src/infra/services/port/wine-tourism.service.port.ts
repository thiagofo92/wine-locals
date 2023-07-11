import { type WineTourismEntity } from '@/core/entities'
import { type Either } from '@/shared/errors/either'

export interface WineTourismServicePort {
  create: (input: WineTourismEntity) => Promise<Either<Error, boolean>>
  update: (input: WineTourismEntity) => Promise<Either<Error, boolean>>
  delete: (id: number) => Promise<Either<Error, boolean>>
  findById: (id: number) => Promise<Either<Error, WineTourismEntity>>
  findAll: () => Promise<Either<Error, WineTourismEntity[]>>
}
