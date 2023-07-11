import { type UserEntity } from '@/core/entities'
import { type Either } from '@/shared/errors/either'

export interface UserServicePort {
  create: (input: UserEntity) => Promise<Either<Error, string>>
  update: (input: UserEntity) => Promise<Either<Error, boolean>>
  delete: (id: string) => Promise<Either<Error, boolean>>
  findById: (id: string) => Promise<Either<Error, UserEntity>>
  findAll: () => Promise<Either<Error, UserEntity[]>>
  validate: (email: string, password: string) => Promise<Either<Error, boolean>>
}
