import { type WineryEntity } from '@/core/entities'
import { right, type Either, left } from '@/shared/errors/either'
import { type WineryServicePort } from '../port'
import { Logger } from '@/shared/logs/logger'
import { PrismaConnection } from './connection/connection'
import { DataServiceNotFound } from '../errors/data.service.error'

interface WineCreated { id: number }

export class WineryPrismaService implements WineryServicePort {
  async create (input: WineryEntity): Promise<Either<Error, WineCreated>> {
    try {
      const result = await PrismaConnection.winery.create({
        data: input
      })
      return right({ id: result.id })
    } catch (error: any) {
      Logger.error(error.code, error.meta)
      return left(error)
    }
  }

  async update (input: WineryEntity): Promise<Either<Error, boolean>> {
    try {
      await PrismaConnection.winery.update({
        where: {
          id: input.id
        },
        data: input
      })
      return right(true)
    } catch (error: any) {
      if (error.code === 'P2025') return left(new DataServiceNotFound())

      Logger.error(error.code, error.meta)
      return left(error)
    }
  }

  async delete (id: number): Promise<Either<Error, boolean>> {
    try {
      await PrismaConnection.winery.delete({
        where: { id }
      })

      return right(true)
    } catch (error: any) {
      if (error.code === 'P2025') return left(new DataServiceNotFound())

      Logger.error(error.code, error.meta)
      return left(error)
    }
  }

  async findById (id: number): Promise<Either<Error, WineryEntity>> {
    try {
      const result = await PrismaConnection.winery.findUnique({
        where: {
          id
        }
      })

      if (!result) return left(new DataServiceNotFound())

      return right(result)
    } catch (error: any) {
      Logger.error(error.code, error.meta)
      return left(error)
    }
  }

  async findAll (): Promise<Either<Error, WineryEntity[]>> {
    try {
      const result = await PrismaConnection.winery.findMany()
      return right(result)
    } catch (error: any) {
      Logger.error(error.code, error.meta)
      return left(error)
    }
  }
}
