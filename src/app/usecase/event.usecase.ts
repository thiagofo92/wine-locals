import { right, type Either, left } from '@/shared/errors/either'
import { type EventUseCasePort } from '../port'
import { type EventAppDto } from '../dto'
import { type EventSerivcePort } from '@/infra/services/port'

export class EventUseCase implements EventUseCasePort {
  constructor (private readonly service: EventSerivcePort) {}

  async create (input: EventAppDto): Promise<Either<Error, boolean>> {
    const result = await this.service.create(input)

    if (result.isLeft()) {
      return left(result.value)
    }
    return right(true)
  }

  async findAll (): Promise<Either<Error, EventAppDto[]>> {
    const result = await this.service.findAll()

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}
