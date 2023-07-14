
import * as Yup from 'yup'
import { type Request, type Response, type NextFunction } from 'express'
import { HTTP_STATUS } from '@/shared/util/http-status'
import { Logger } from '@/shared/logs/logger'
import { Week } from '@/core/entities'
import { Context } from '@/shared/util/async-hook'

const WineTourismSchema = Yup.object({
  id: Yup.number().required(),
  idWinery: Yup.number().required(),
  name: Yup.string().max(20).required(),
  description: Yup.string().required(),
  price: Yup.string().required(),
  startHour: Yup.string().max(5).required(),
  endHour: Yup.string().max(5).required(),
  duration: Yup.string().max(5).required(),
  openDays: Yup.array().of(Yup.string()).required().test((value) => {
    for (let i = 0; i < value.length; i++) {
      const element = value[i] || ''
      const isWeek = Reflect.has(Week, element)
      if (!isWeek) return false
    }
    return true
  })
})

const ByIdSchema = WineTourismSchema.pick(['id'])
const CreateSchema = WineTourismSchema.omit(['id'])

export function WineTourismByIdMiddleware (req: Request, res: Response, next: NextFunction): void {
  const { query } = req
  const context = Context.get()
  Logger.info('Middleware - WineTourims find by iD', { requestId: context.requestId })

  ByIdSchema.validate(query, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      res.status(HTTP_STATUS.BAD_REQUEST).json(message)
      Logger.warn(message, { requestId: context.requestId })
    })
}

export function WineTourismCreateMiddleware (req: Request, res: Response, next: NextFunction): void {
  const { body } = req
  const context = Context.get()
  Logger.info('Middleware - WineTourims Create', { requestId: context.requestId })

  CreateSchema.validate(body, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      res.status(HTTP_STATUS.BAD_REQUEST).json(message)
      Logger.warn(message, { requestId: context.requestId })
    })
}

export function WineTourismUpdateMiddleware (req: Request, res: Response, next: NextFunction): void {
  const { body } = req
  const context = Context.get()
  Logger.info('Middleware - WineTourims Update', { requestId: context.requestId })

  WineTourismSchema.validate(body, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      res.status(HTTP_STATUS.BAD_REQUEST).json(message)
      Logger.warn(message, { requestId: context.requestId })
    })
}
