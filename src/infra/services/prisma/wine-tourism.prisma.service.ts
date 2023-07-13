import { WineTourismEntity } from '@/core/entities'
import { right, type Either, left } from '@/shared/errors/either'
import { type WineTourismServicePort } from '../port'
import { Logger } from '@/shared/logs/logger'
import { PrismaConnection } from './connection/connection'
import { DataServiceNotFound } from '../errors/data.service.error'

interface WineTourismCreated { id: number }

export class WineTourismPrismaService implements WineTourismServicePort {
  async create (input: WineTourismEntity): Promise<Either<Error, WineTourismCreated>> {
    try {
      const result = await PrismaConnection.wine_tourism.create({
        data: {
          name: input.name,
          description: input.description,
          duration: input.duration,
          end_hour: input.endHour,
          start_hour: input.startHour,
          open_days: input.openDays,
          price: input.price,
          id_winery: input.idWinery
        }
      })
      return right({ id: result.id })
    } catch (error: any) {
      Logger.error(error.code, error.meta)
      return left(error)
    }
  }

  async update (input: WineTourismEntity): Promise<Either<Error, boolean>> {
    try {
      await PrismaConnection.wine_tourism.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name,
          description: input.description,
          duration: input.duration,
          end_hour: input.endHour,
          start_hour: input.startHour,
          open_days: input.openDays,
          price: input.price,
          id_winery: input.idWinery
        }
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
      await PrismaConnection.wine_tourism.delete({
        where: { id }
      })

      return right(true)
    } catch (error: any) {
      if (error.code === 'P2025') return left(new DataServiceNotFound())

      Logger.error(error.code, error.meta)
      return left(error)
    }
  }

  async findById (id: number): Promise<Either<Error, WineTourismEntity>> {
    try {
      const result = await PrismaConnection.wine_tourism.findUnique({
        where: {
          id
        }
      })

      if (!result) return left(new DataServiceNotFound())

      const winery: WineTourismEntity = {
        id: result.id,
        idWinery: result.id_winery,
        name: result.name,
        description: result.description,
        duration: result.duration,
        endHour: result.end_hour,
        startHour: result.start_hour,
        openDays: WineTourismEntity.Week[result.open_days],
        price: result.price.toFixed(2)
      }

      return right(winery)
    } catch (error: any) {
      Logger.error(error.code, error.meta)
      return left(error)
    }
  }

  async findAll (): Promise<Either<Error, WineTourismEntity[]>> {
    try {
      const result = await PrismaConnection.wine_tourism.findMany()
      const winery = result.map<WineTourismEntity>(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        duration: item.duration,
        endHour: item.end_hour,
        startHour: item.start_hour,
        idWinery: item.id_winery,
        openDays: WineTourismEntity.Week[item.open_days],
        price: item.price.toFixed(2)
      }))

      return right(winery)
    } catch (error: any) {
      Logger.error(error.code, error.meta)
      return left(error)
    }
  }
}
