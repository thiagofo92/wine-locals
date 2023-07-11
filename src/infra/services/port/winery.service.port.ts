
import { type WineryEntity } from '@/core/entities'
import { type Either } from '@/shared/errors/either'

export interface WinerySerivcePort {
  create: (input: WineryEntity) => Promise<Either<Error, boolean>>
  update: (input: WineryEntity) => Promise<Either<Error, boolean>>
  delete: (id: number) => Promise<Either<Error, boolean>>
  findById: (id: number) => Promise<Either<Error, WineryEntity>>
  findAll: () => Promise<Either<Error, WineryEntity[]>>
}
