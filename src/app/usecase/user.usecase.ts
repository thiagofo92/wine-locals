import { type Either, left, right } from '@/shared/errors/either'
import { type UserUseCasePort } from '../port'
import { type UserServicePort } from '@/infra/services/port'
import { type UserAppDto } from '../dto'
import { UserEntity } from '@/core/entities'
import { UserUseCaseLegalAgeError } from '../errors'
import { Context } from '@/shared/util/async-hook'
import { Logger } from '@/shared/logs/logger'
export class UserUseCase implements UserUseCasePort {
  constructor (private readonly service: UserServicePort) {}

  async create (input: UserAppDto): Promise<Either<Error, string>> {
    const context = Context.get()
    Logger.info('UseCase - User new user', { requestId: context.requestId })
    const user = new UserEntity(input)

    if (!user.hasLegalAge()) return left(new UserUseCaseLegalAgeError())

    const result = await this.service.create(user)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }

  async validate (email: string, password: string): Promise<Either<Error, boolean>> {
    const context = Context.get()
    Logger.info('UseCase - User validate', { requestId: context.requestId })
    const result = await this.service.validate(email, password)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }

  async findById (id: string): Promise<Either<Error, UserAppDto>> {
    const context = Context.get()
    Logger.info('UseCase - User find by ID', { requestId: context.requestId })
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
