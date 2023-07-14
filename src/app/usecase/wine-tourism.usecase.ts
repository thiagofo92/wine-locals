import { right, type Either, left } from '@/shared/errors/either'
import { type WineTourismUseCasePort } from '../port'
import { type WineTourismServicePort } from '@/infra/services/port'
import { type WineTourismAppDto } from '../dto'
import { Context } from '@/shared/util/async-hook'
import { Logger } from '@/shared/logs/logger'

export class WineTourismUseCase implements WineTourismUseCasePort {
  constructor (private readonly service: WineTourismServicePort) {}

  async create (input: WineTourismAppDto): Promise<Either<Error, { id: number }>> {
    const context = Context.get()
    Logger.info('UseCase - Wine Tourism create new', { requestId: context.requestId })
    const result = await this.service.create(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }

  async update (input: WineTourismAppDto): Promise<Either<Error, boolean>> {
    const context = Context.get()
    Logger.info('UseCase - Wine Tourism update', { requestId: context.requestId })
    const result = await this.service.update(input)

    if (result.isLeft()) {
      return left(result.value)
    }
    return right(true)
  }

  async delete (id: number): Promise<Either<Error, boolean>> {
    const context = Context.get()
    Logger.info('UseCase - Wine Tourism delete by ID', { requestId: context.requestId })
    const result = await this.service.delete(id)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }

  async findById (id: number): Promise<Either<Error, WineTourismAppDto>> {
    const context = Context.get()
    Logger.info('UseCase - Wine Tourism find by ID', { requestId: context.requestId })
    const result = await this.service.findById(id)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }

  async findAll (): Promise<Either<Error, WineTourismAppDto[]>> {
    const context = Context.get()
    Logger.info('UseCase - Wine Tourism find all', { requestId: context.requestId })
    const result = await this.service.findAll()

    if (result.isLeft()) {
      return left(result.value)
    }
    return right(result.value)
  }
}
