import * as Yup from 'yup'
import { type Request, type Response, type NextFunction } from 'express'
import { HTTP_STATUS } from '@/shared/util/http-status'
import { Logger } from '@/shared/logs/logger'
import { Context } from '@/shared/util/async-hook'

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
  const context = Context.get()
  Logger.info('Middleware - Winery find by ID', { requestId: context.requestId })

  ByIdSchema.validate(query, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      res.status(HTTP_STATUS.BAD_REQUEST).json(message)
      Logger.warn(message, { requestId: context.requestId })
    })
}

export function WineryCreateMiddleware (req: Request, res: Response, next: NextFunction): void {
  const { body } = req
  const context = Context.get()
  Logger.info('Middleware - Winery create', { requestId: context.requestId })

  CreateSchema.validate(body, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      res.status(HTTP_STATUS.BAD_REQUEST).json(message)
      Logger.warn(message, { requestId: context.requestId })
    })
}

export function WineryUpdateMiddleware (req: Request, res: Response, next: NextFunction): void {
  const { body } = req
  const context = Context.get()
  Logger.info('Middleware - Winery update', { requestId: context.requestId })

  WinerySchema.validate(body, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      res.status(HTTP_STATUS.BAD_REQUEST).json(message)
      Logger.warn(message, { requestId: context.requestId })
    })
}
