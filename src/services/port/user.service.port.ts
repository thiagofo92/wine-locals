import { Either } from "../../shared/errors/either";

export interface UserSerivcePort {
  create: () => Promise<Either<Error, unknown>>
}