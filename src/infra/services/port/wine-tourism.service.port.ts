import { WineTourismEntity } from "@/core/entities";
import { Either } from "@/shared/errors/either";

export interface UserSerivcePort {
  create: (input: WineTourismEntity) => Promise<Either<Error, boolean>>
  update: (input: WineTourismEntity) => Promise<Either<Error, boolean>>
  delete: (id: string) => Promise<Either<Error, boolean>>
  findById: (id: string) => Promise<Either<Error, WineTourismEntity | null>>
  findAll: () => Promise<Either<Error, WineTourismEntity[]>>
}