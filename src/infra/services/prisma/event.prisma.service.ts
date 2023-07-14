import { type EventEntity } from '@/core/entities'
import { right, type Either, left } from '@/shared/errors/either'
import { type EventServicePort } from '../port'
import { Logger } from '@/shared/logs/logger'
import { PrismaConnection } from './connection/connection'
import { DataServiceNotFound } from '../errors/data.service.error'
import { Context } from '@/shared/util/async-hook'

interface EventCreated { id: number }
interface CustomEventPrisma {
  id: number
  id_user: string
  id_winery_tourism: number
  date: string
  hour: string
  payment: string
}
export class EventPrismaService implements EventServicePort {
  async create (input: EventEntity): Promise<Either<Error, EventCreated>> {
    try {
      const user = await PrismaConnection.users.findFirst({
        where: { uuid: input.idUser }
      })

      if (!user) return left(new DataServiceNotFound('User not found'))
      const result = await PrismaConnection.event.create({
        data: {
          id_user: user.id,
          id_winery_tourism: input.idWineTourism,
          payment: input.payment,
          date: input.date,
          hour: input.hour
        }
      })

      return right({ id: result.id })
    } catch (error: any) {
      const context = Context.get()
      const message = error.code || error.name
      Logger.error(message, [{ message: error.meta, requestId: context.requestId }, { message: error.message }])
      return left(error)
    }
  }

  async findAll (): Promise<Either<Error, EventEntity[]>> {
    try {
      const result = await PrismaConnection.$queryRaw<CustomEventPrisma[]>`
      SELECT event.id, event.id_winery_tourism, event.date, event.hour, event.payment, users.uuid as id_user
      FROM event
      INNER JOIN users ON users.id = event.id_user;`
      const event = result.map<EventEntity>(item => ({
        id: item.id,
        idUser: item.id_user,
        idWineTourism: item.id_winery_tourism,
        date: item.date,
        hour: item.hour,
        payment: item.payment
      }))

      return right(event)
    } catch (error: any) {
      const context = Context.get()
      const message = error.code || error.name
      Logger.error(message, [{ message: error.meta, requestId: context.requestId }, { message: error.message }])
      return left(error)
    }
  }
}
