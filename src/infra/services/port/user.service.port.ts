import { UserEntity } from "@/core/entities";
import { Either } from "@/shared/errors/either";

export interface UserSerivcePort {
  create: (input: UserEntity) => Promise<Either<Error, string>>
  update: (input: UserEntity) => Promise<Either<Error, boolean>>
  delete: (id: string) => Promise<Either<Error, boolean>>
  findById: (id: string) => Promise<Either<Error, UserEntity>>
  findAll: () => Promise<Either<Error, UserEntity[]>>
  validate: () => Promise<Either<Error, boolean>>
}