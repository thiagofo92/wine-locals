
import { type WineryEntity } from '@/core/entities'
import { type Either } from '@/shared/errors/either'

interface WineCreated { id: number }

export interface WineryServicePort {
  create: (input: WineryEntity) => Promise<Either<Error, WineCreated>>
  update: (input: WineryEntity) => Promise<Either<Error, boolean>>
  delete: (id: number) => Promise<Either<Error, boolean>>
  findById: (id: number) => Promise<Either<Error, WineryEntity>>
  findAll: () => Promise<Either<Error, WineryEntity[]>>
}
