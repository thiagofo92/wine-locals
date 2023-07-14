import { type Either, left, right } from '@/shared/errors/either'
import { type UserServicePort } from '../port'
import { PrismaConnection } from './connection/connection'
import { UserEntity } from '@/core/entities'
import { DataServiceNotFound } from '../errors/data.service.error'
import { Logger } from '@/shared/logs/logger'
import { UserCreatContrainError, UserValidateFail } from '../errors/user.service.error'
import { Context } from '@/shared/util/async-hook'
export class UserPrismaService implements UserServicePort {
  async create (input: UserEntity): Promise<Either<Error, string>> {
    try {
      const result = await PrismaConnection.users.create({
        data: {
          uuid: input.id,
          name: input.name,
          cpf: input.cpf,
          birthday: input.birthday,
          email: input.email,
          password: input.password
        }
      })
      return right(result.uuid)
    } catch (error: any) {
      const context = Context.get()
      const message = error.code || error.name
      Logger.error(message, [{ message: error.meta, requestId: context.requestId }, { message: error.message }])

      if (error.code === 'P2002') return left(new UserCreatContrainError())
      return left(error)
    }
  }

  async update (input: UserEntity): Promise<Either<Error, boolean>> {
    try {
      await PrismaConnection.users.update({
        where: {
          uuid: input.id
        },
        data: {
          uuid: input.id,
          name: input.name,
          cpf: input.cpf,
          birthday: input.birthday,
          email: input.email,
          password: input.password
        }
      })

      return right(true)
    } catch (error: any) {
      if (error.code === 'P2025') return left(new DataServiceNotFound())

      Logger.error(error.code, error.meta)
      return left(error)
    }
  }

  async delete (id: string): Promise<Either<Error, boolean>> {
    try {
      await PrismaConnection.users.delete({
        where: {
          uuid: id
        }
      })

      return right(true)
    } catch (error: any) {
      if (error.code === 'P2025') return left(new DataServiceNotFound())

      Logger.error(error.code, error.meta)
      return left(error)
    }
  }

  async findById (id: string): Promise<Either<Error, UserEntity>> {
    try {
      const result = await PrismaConnection.users.findUnique({
        where: {
          uuid: id
        }
      })
      if (!result) return left(new DataServiceNotFound())

      const user = new UserEntity({
        id: result.uuid,
        name: result.name,
        password: result.password,
        email: result.email,
        birthday: result.birthday,
        cpf: result.cpf
      })

      return right(user)
    } catch (error: any) {
      const context = Context.get()
      const message = error.code || error.name
      Logger.error(message, [{ message: error.meta, requestId: context.requestId }, { message: error.message }])
      return left(error)
    }
  }

  async findAll (): Promise<Either<Error, UserEntity[]>> {
    try {
      const result = await PrismaConnection.users.findMany()
      const users = result.map(item => new UserEntity({
        id: item.uuid,
        name: item.name,
        email: item.email,
        password: item.password,
        birthday: item.birthday,
        cpf: item.cpf
      }))

      return right(users)
    } catch (error: any) {
      Logger.error(error.code, error.meta)
      return left(error)
    }
  }

  async validate (email: string, password: string): Promise<Either<Error, string>> {
    try {
      const result = await PrismaConnection.users.findFirst({
        where: {
          email,
          password
        }
      })

      if (!result) return left(new UserValidateFail())

      return right(result.uuid)
    } catch (error: any) {
      const context = Context.get()
      const message = error.code || error.name
      Logger.error(message, [{ message: error.meta, requestId: context.requestId }, { message: error.message }])
      return left(error)
    }
  }
}
