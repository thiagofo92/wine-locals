import { type WineTourismUseCasePort } from '@/app/port'
import { DataServiceNotFound } from '@/infra/services/errors/data.service.error'
import { Logger } from '@/shared/logs/logger'
import { Context } from '@/shared/util/async-hook'
import { type HttpDataResponse } from '@/shared/util/http-data-response'
import { HTTP_STATUS } from '@/shared/util/http-status'
import { type Response, type Request } from 'express'

export class WineTourismController {
  constructor (private readonly usecase: WineTourismUseCasePort) {}

  async create (req: Request, res: Response): Promise<void> {
    const context = Context.get()
    Logger.info('Controller - Create new Wine Tourism', { requestId: context.requestId })
    const { body } = req

    const result = await this.usecase.create(body)
    if (result.isLeft()) {
      const error = this.checkError(result.value)
      res.status(error.statusCode).json(error.message)
      return
    }

    Logger.info('Controller - Success to create new Wine Tourism', { requestId: context.requestId })
    res.status(HTTP_STATUS.CREATED).json(result.value)
  }

  async update (req: Request, res: Response): Promise<void> {
    const context = Context.get()
    Logger.info('Controller - Update the Wine Tourism', { requestId: context.requestId })
    const { body } = req
    const result = await this.usecase.update(body)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      res.status(error.statusCode).json(error.message)
      return
    }
    Logger.info('Controller - Success to update the Wine Tourism', { requestId: context.requestId })
    res.status(HTTP_STATUS.OK).json(result.value)
  }

  async delete (req: Request, res: Response): Promise<void> {
    const context = Context.get()
    Logger.info('Controller - Delete the Wine Tourism by ID', { requestId: context.requestId })
    const { query } = req
    const result = await this.usecase.delete(Number(query.id))

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      res.status(error.statusCode).json(error.message)
      return
    }

    Logger.info('Controller - Success to delete the Wine Tourism', { requestId: context.requestId })
    res.status(HTTP_STATUS.OK).json(result.value)
  }

  async findById (req: Request, res: Response): Promise<void> {
    const context = Context.get()
    Logger.info('Controller - Find the Wine Tourism by ID', { requestId: context.requestId })
    const { query } = req
    const result = await this.usecase.findById(Number(query.id))

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      res.status(error.statusCode).json(error.message)
      return
    }
    Logger.info('Controller - Success to find the Wine Tourism by ID', { requestId: context.requestId })
    res.status(HTTP_STATUS.OK).json(result.value)
  }

  async findAll (req: Request, res: Response): Promise<void> {
    const context = Context.get()
    Logger.info('Controller - Find all Wine Tourism', { requestId: context.requestId })
    const result = await this.usecase.findAll()

    if (result.isLeft()) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json('Server internal error')
      return
    }

    Logger.info('Controller - Success to find all Wine Tourism', { requestId: context.requestId })
    res.status(HTTP_STATUS.OK).json(result.value)
  }

  private checkError (error: Error): HttpDataResponse {
    if (error instanceof DataServiceNotFound) {
      return {
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: error.message
      }
    }

    return {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error'
    }
  }
}
