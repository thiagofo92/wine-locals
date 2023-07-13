import { type UserUseCasePort } from '@/app/port'
import { DataServiceNotFound } from '@/infra/services/errors/data.service.error'
import { type HttpDataResponse } from '@/shared/util/http-data-response'
import { HTTP_STATUS } from '@/shared/util/http-status'
import { type Request, type Response } from 'express'

export class UsersControllers {
  constructor (private readonly usecase: UserUseCasePort) {}

  async create (req: Request, res: Response): Promise<void> {
    const { body } = req
    const result = await this.usecase.create(body)

    if (result.isLeft()) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Error' })
      return
    }

    res.status(HTTP_STATUS.CREATED).json(result.value)
  }

  async findById (req: Request, res: Response): Promise<void> {
    const { query } = req
    const result = await this.usecase.findById(String(query.id))

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      res.status(error.statusCode).json(error.message)
      return
    }

    res.status(HTTP_STATUS.OK).json(result.value)
  }

  async validate (req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    const result = await this.usecase.validate(email, password)

    if (result.isLeft()) {
      res.status(500).json({ message: 'internal error' })
      return
    }

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(result)
  }

  private checkError (error: Error): HttpDataResponse {
    if (error instanceof DataServiceNotFound) {
      return {
        message: error.message,
        statusCode: HTTP_STATUS.NOT_FOUND
      }
    }

    return {
      message: 'Internal Error',
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR
    }
  }
}
