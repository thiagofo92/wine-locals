import { type EventUseCasePort } from '@/app/port'
import { Logger } from '@/shared/logs/logger'
import { Context } from '@/shared/util/async-hook'
import { HTTP_STATUS } from '@/shared/util/http-status'
import { type Request, type Response } from 'express'

export class EventController {
  constructor (private readonly usecase: EventUseCasePort) {}

  async create (req: Request, res: Response): Promise<void> {
    const context = Context.get()
    Logger.info('Controller - Create new event', { requestId: context.requestId })
    const { body } = req

    const result = await this.usecase.create(body)

    if (result.isLeft()) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json('Internal server error')
      return
    }

    Logger.info('Controller - Success to create the event', { requestId: context.requestId })
    res.status(HTTP_STATUS.CREATED).json(result.value)
  }

  async findAll (req: Request, res: Response): Promise<void> {
    const context = Context.get()
    Logger.info('Controller - Find all events', { requestId: context.requestId })
    const result = await this.usecase.findAll()

    if (result.isLeft()) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json('Internal server error')
    }

    Logger.info('Controller - Success to find all events', { requestId: context.requestId })
    res.status(HTTP_STATUS.OK).json(result.value)
  }
}
