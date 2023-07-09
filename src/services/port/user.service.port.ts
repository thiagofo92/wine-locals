import { Either } from "../../shared/errors/either";

export interface UserSerivcePort {
  create: (input: unknown) => Promise<Either<Error, unknown>>
  update: (input: unknown) => Promise<Either<Error, unknown>>
  delete: (id: string) => Promise<Either<Error, unknown>>
  findById: (id: string) => Promise<Either<Error, unknown>>
  findAll: () => Promise<Either<Error, unknown>>
  validate: () => Promise<Either<Error, unknown>>
}