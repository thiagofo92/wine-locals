import * as Yup from 'yup'
import { type Request, type Response, type NextFunction } from 'express'
import { HTTP_STATUS } from '@/shared/util/http-status'
import { Logger } from '@/shared/logs/logger'
import { Context } from '@/shared/util/async-hook'

const EventSchema = Yup.object({
  id: Yup.number().required(),
  idWineTourism: Yup.number().required(),
  idUser: Yup.string().required(),
  date: Yup.string().max(10).required(),
  hour: Yup.string().max(5).required()
})

const CreateSchema = EventSchema.omit(['id'])
export function EventCreateMiddleware (req: Request, res: Response, next: NextFunction): void {
  const { body } = req
  const context = Context.get()
  Logger.info('Middleware - Event create')

  CreateSchema.validate(body, { abortEarly: false })
    .then(_ => { next() })
    .catch(({ errors }) => {
      const params: string = errors.map((item: any) => item).join(', ')
      const message = `Invalid parameter ${params}`
      res.status(HTTP_STATUS.BAD_REQUEST).json(message)
      Logger.warn(message, { requestId: context.requestId })
    })
}
