
import * as Yup from 'yup'
import { type Request, type Response, type NextFunction } from 'express'
import { HTTP_STATUS } from '@/shared/util/http-status'
import { Logger } from '@/shared/logs/logger'
import { type WineTourismEntity } from '@/core/entities'

const WineTourismSchema = Yup.object({
  id: Yup.number().required(),
  idWinery: Yup.number().required(),
  name: Yup.string().max(20).required(),
  description: Yup.string().required(),
  price: Yup.string().required(),
  startHour: Yup.string().max(5).required(),
  endHour: Yup.string().max(5).required(),
  duration: Yup.string().max(5).required(),
  openDays: Yup.string<WineTourismEntity.Week>()
})

const ByIdSchema = WineTourismSchema.pick(['id'])
const CreateSchema = WineTourismSchema.omit(['id'])

export function WineTourismByIdMiddleware (req: Request, res: Response, next: NextFunction): void {
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

export function WineTourismCreateMiddleware (req: Request, res: Response, next: NextFunction): void {
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

export function WineTourismUpdateMiddleware (req: Request, res: Response, next: NextFunction): void {
  const { body } = req
  Logger.info('Start create person - Middleware')

  WineTourismSchema.validate(body, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      res.status(HTTP_STATUS.BAD_REQUEST).json(message)
      Logger.warn(message)
    })
}
