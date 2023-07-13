import { type WineryUseCasePort } from '@/app/port'
import { DataServiceNotFound } from '@/infra/services/errors/data.service.error'
import { type HttpDataResponse } from '@/shared/util/http-data-response'
import { HTTP_STATUS } from '@/shared/util/http-status'
import { type Response, type Request } from 'express'

export class WineryController {
  constructor (private readonly usecase: WineryUseCasePort) {}

  async create (req: Request, res: Response): Promise<void> {
    const { body } = req
    const result = await this.usecase.create(body)
    if (result.isLeft()) {
      const error = this.checkError(result.value)
      res.status(error.statusCode).json(error.message)
      return
    }
    res.status(HTTP_STATUS.CREATED).json(result.value)
  }

  async update (req: Request, res: Response): Promise<void> {
    const { body } = req
    const result = await this.usecase.update(body)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      res.status(error.statusCode).json(error.message)
      return
    }
    res.status(HTTP_STATUS.OK).json(result.value)
  }

  async delete (req: Request, res: Response): Promise<void> {
    const { query } = req
    const result = await this.usecase.delete(Number(query.id))

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      res.status(error.statusCode).json(error.message)
      return
    }

    res.status(HTTP_STATUS.OK).json(result.value)
  }

  async findById (req: Request, res: Response): Promise<void> {
    const { query } = req
    const result = await this.usecase.findById(Number(query.id))

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      res.status(error.statusCode).json(error.message)
      return
    }
    res.status(HTTP_STATUS.OK).json(result.value)
  }

  async findAll (req: Request, res: Response): Promise<void> {
    const result = await this.usecase.findAll()

    if (result.isLeft()) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json('Server internal error')
      return
    }

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
