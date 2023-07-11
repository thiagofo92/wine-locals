import { type Either, left, right } from '@/shared/errors/either'
import { type UserUseCasePort } from '../port'
import { type UserServicePort } from '@/infra/services/port'
import { type UserAppDto } from '../dto'
import { UserEntity } from '@/core/entities'
import { UserUseCaseLegalAgeError } from '../errors'

export class UserUseCase implements UserUseCasePort {
  constructor (private readonly service: UserServicePort) {}

  async create (input: UserAppDto): Promise<Either<Error, string>> {
    const user = new UserEntity(input)

    if (!user.hasLegalAge()) return left(new UserUseCaseLegalAgeError())

    const result = await this.service.create(user)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }

  async validate (email: string, password: string): Promise<Either<Error, boolean>> {
    const result = await this.service.validate(email, password)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }

  async findById (id: string): Promise<Either<Error, UserAppDto>> {
    const result = await this.service.findById(id)

    if (result.isLeft()) {
      return left(result.value)
    }

    const { value } = result
    const user: UserAppDto = {
      id: value.id,
      name: value.name,
      email: value.email,
      password: value.password,
      cpf: value.cpf,
      birthday: value.birthday
    }

    return right(user)
  }
}
