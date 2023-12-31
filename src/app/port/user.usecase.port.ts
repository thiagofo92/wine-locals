import { type Either } from '@/shared/errors/either'
import { type UserAppDto } from '../dto'

export interface UserUseCasePort {
  create: (input: UserAppDto) => Promise<Either<Error, string>>
  validate: (email: string, password: string) => Promise<Either<Error, string>>
  findById: (id: string) => Promise<Either<Error, UserAppDto>>
}
