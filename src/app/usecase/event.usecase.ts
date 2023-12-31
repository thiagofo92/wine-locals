import { right, type Either, left } from '@/shared/errors/either'
import { type EventUseCasePort } from '../port'
import { type EventAppDto } from '../dto'
import { type EventServicePort } from '@/infra/services/port'

export class EventUseCase implements EventUseCasePort {
  constructor (private readonly service: EventServicePort) {}

  async create (input: EventAppDto): Promise<Either<Error, boolean>> {
    input.payment = 'WAIT_PAYMENT'
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
