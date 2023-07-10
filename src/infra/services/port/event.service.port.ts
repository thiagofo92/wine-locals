import { WineTourismEntity } from "@/core/entities";
import { Either } from "@/shared/errors/either";

export interface UserSerivcePort {
  create: (input: WineTourismEntity) => Promise<Either<Error, boolean>>
  findAll: () => Promise<Either<Error, WineTourismEntity[]>>
}