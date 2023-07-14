import { type EventUseCasePort } from '@/app/port'
import { DataServiceNotFound } from '@/infra/services/errors/data.service.error'
import { Logger } from '@/shared/logs/logger'
import { Context } from '@/shared/util/async-hook'
import { type HttpDataResponse } from '@/shared/util/http-data-response'
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
      const error = this.checkError(result.value)

      res.status(error.statusCode).json(error.message)
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

  private checkError (error: Error): HttpDataResponse {
    if (error instanceof DataServiceNotFound) {
      return {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: error.message
      }
    }
    return {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: 'Internal server error'
    }
  }
}
