import { type Either } from '@/shared/errors/either'
import { type WineryAppDto } from '../dto'

export interface WineryUseCasePort {
  create: (input: WineryAppDto) => Promise<Either<Error, boolean>>
  update: (input: WineryAppDto) => Promise<Either<Error, boolean>>
  delete: (id: number) => Promise<Either<Error, boolean>>
  findById: (id: number) => Promise<Either<Error, WineryAppDto>>
  findAll: () => Promise<Either<Error, WineryAppDto[]>>
}
