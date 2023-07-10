import { Either } from "@/shared/errors/either";
import { UserAppDto } from "../dto";

export interface UserUseCasePort {
  create: (input: UserAppDto) => Promise<Either<Error, string>>
  validate: (email: string, password: string) => Promise<Either<Error, boolean>>
  findById: (id: string) => Promise<Either<Error, UserAppDto>>
}