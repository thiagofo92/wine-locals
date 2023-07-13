import { Logger } from '@/shared/logs/logger'
import { HTTP_STATUS } from '@/shared/util/http-status'
import { type NextFunction, type Request, type Response } from 'express'
import * as Yup from 'yup'

const UserSchema = Yup.object({
  name: Yup.string().max(20),
  cpf: Yup.string().max(11),
  birthday: Yup.date(),
  password: Yup.string().max(16),
  email: Yup.string().email().max(35)
})

export function UserCreateMiddleware (req: Request, res: Response, next: NextFunction): void {
  const { body } = req
  Logger.info('Start create person - Middleware')

  UserSchema.validate(body, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      res.status(HTTP_STATUS.BAD_REQUEST).json(message)
      Logger.warn(message)
    })
}
const UserValidateSchema = UserSchema.pick(['email', 'password'])
export function UserValidateMiddleware (req: Request, res: Response, next: NextFunction): void {
  const { body } = req
  Logger.info('Start create person - Middleware')

  UserValidateSchema.validate(body, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      res.status(HTTP_STATUS.BAD_REQUEST).json(message)
      Logger.warn(message)
    })
}

const UserFindByIdSchema = Yup.object({
  id: Yup.string().uuid()
})

export function UserByIdMiddleware (req: Request, res: Response, next: NextFunction): void {
  const { query } = req
  Logger.info('Start create person - Middleware')

  UserFindByIdSchema.validate(query, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      res.status(HTTP_STATUS.BAD_REQUEST).json(message)
      Logger.warn(message)
    })
}
