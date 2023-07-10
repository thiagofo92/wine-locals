
import { WineryEntity } from "@/core/entities";
import { Either } from "@/shared/errors/either";

export interface UserSerivcePort {
  create: (input: WineryEntity) => Promise<Either<Error, boolean>>
  update: (input: WineryEntity) => Promise<Either<Error, boolean>>
  delete: (id: string) => Promise<Either<Error, boolean>>
  findById: (id: string) => Promise<Either<Error, WineryEntity | null>>
  findAll: () => Promise<Either<Error, WineryEntity[]>>
}