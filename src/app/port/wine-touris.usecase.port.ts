
import { type Either } from '@/shared/errors/either'
import { type WineTourismAppDtoOutPut, type WineTourismAppDto } from '../dto'

export interface WineTourismUseCasePort {
  create: (input: WineTourismAppDto) => Promise<Either<Error, { id: number }>>
  update: (input: WineTourismAppDto) => Promise<Either<Error, boolean>>
  delete: (id: number) => Promise<Either<Error, boolean>>
  findById: (id: number) => Promise<Either<Error, WineTourismAppDtoOutPut>>
  findAll: () => Promise<Either<Error, WineTourismAppDtoOutPut[]>>
}
