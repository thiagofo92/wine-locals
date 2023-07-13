import { type EventUseCasePort } from '@/app/port'
import { HTTP_STATUS } from '@/shared/util/http-status'
import { type Request, type Response } from 'express'

export class EventController {
  constructor (private readonly usecase: EventUseCasePort) {}

  async create (req: Request, res: Response): Promise<void> {
    const { body } = req

    const result = await this.usecase.create(body)

    if (result.isLeft()) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json('Internal server error')
      return
    }

    res.status(HTTP_STATUS.CREATED).json(result.value)
  }

  async findAll (req: Request, res: Response): Promise<void> {
    const result = await this.usecase.findAll()

    if (result.isLeft()) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json('Internal server error')
    }

    res.status(HTTP_STATUS.OK).json(result.value)
  }
}
