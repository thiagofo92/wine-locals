import * as Yup from 'yup'
import { type Request, type Response, type NextFunction } from 'express'
import { HTTP_STATUS } from '@/shared/util/http-status'
import { Logger } from '@/shared/logs/logger'

const WinerySchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().max(45).required(),
  address: Yup.string().max(50).required(),
  state: Yup.string().max(15).required(),
  city: Yup.string().max(25).required(),
  site: Yup.string().max(30).required()
})

const ByIdSchema = WinerySchema.pick(['id'])
const CreateSchema = WinerySchema.omit(['id'])

export function WineryByIdMiddleware (req: Request, res: Response, next: NextFunction): void {
  const { query } = req
  Logger.info('Start create person - Middleware')

  ByIdSchema.validate(query, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      res.status(HTTP_STATUS.BAD_REQUEST).json(message)
      Logger.warn(message)
    })
}

export function WineryCreateMiddleware (req: Request, res: Response, next: NextFunction): void {
  const { body } = req
  Logger.info('Start create person - Middleware')

  CreateSchema.validate(body, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      res.status(HTTP_STATUS.BAD_REQUEST).json(message)
      Logger.warn(message)
    })
}

export function WineryUpdateMiddleware (req: Request, res: Response, next: NextFunction): void {
  const { body } = req
  Logger.info('Start create person - Middleware')

  WinerySchema.validate(body, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      res.status(HTTP_STATUS.BAD_REQUEST).json(message)
      Logger.warn(message)
    })
}
