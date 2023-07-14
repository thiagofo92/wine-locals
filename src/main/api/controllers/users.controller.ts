import { UserUseCaseLegalAgeError } from '@/app/errors'
import { type UserUseCasePort } from '@/app/port'
import { DataServiceNotFound } from '@/infra/services/errors/data.service.error'
import { UserCreatContrainError, UserValidateFail } from '@/infra/services/errors/user.service.error'
import { generateTokenJWT } from '@/shared/jwt/jwt'
import { Logger } from '@/shared/logs/logger'
import { Context } from '@/shared/util/async-hook'
import { type HttpDataResponse } from '@/shared/util/http-data-response'
import { HTTP_STATUS } from '@/shared/util/http-status'
import { type Request, type Response } from 'express'

export class UsersControllers {
  constructor (private readonly usecase: UserUseCasePort) {}

  async create (req: Request, res: Response): Promise<void> {
    const context = Context.get()
    Logger.info('User controller create new user', { requestId: context.requestId })

    const { body } = req
    const result = await this.usecase.create(body)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      res.status(error.statusCode).json({ message: error.message })
      return
    }
    Logger.info('Success to create the user', { requestId: context.requestId })

    const token = generateTokenJWT(result.value)
    res.setHeader('x-access-token', token)
    res.status(HTTP_STATUS.CREATED).json({ id: result.value, token })
  }

  async findById (req: Request, res: Response): Promise<void> {
    const context = Context.get()
    Logger.info('User controller create new user', { requestId: context.requestId })

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
    const context = Context.get()
    Logger.info('User controller create new user', { requestId: context.requestId })
    const { email, password } = req.body

    const result = await this.usecase.validate(email, password)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      res.status(error.statusCode).json(error.message)
      return
    }

    Logger.info('Controller - User success to validate', { requestId: context.requestId })
    const token = generateTokenJWT(result.value)
    res.setHeader('x-access-token', token)
    res.status(HTTP_STATUS.OK).json({ id: result.value, token })
  }

  private checkError (error: Error): HttpDataResponse {
    if (error instanceof UserUseCaseLegalAgeError) {
      return {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: error.message
      }
    }

    if (error instanceof UserCreatContrainError) {
      return {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: error.message
      }
    }

    if (error instanceof UserValidateFail) {
      return {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: error.message
      }
    }

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
