import { type EventEntity } from '@/core/entities'
import { right, type Either } from '@/shared/errors/either'
import { type EventSerivcePort } from '../port'

export class EventMemoryService implements EventSerivcePort {
  private readonly event: EventEntity [] = []
  async create (input: EventEntity): Promise<Either<Error, boolean>> {
    this.event.push(input)
    return right(true)
  }

  async findAll (): Promise<Either<Error, EventEntity[]>> {
    return right(this.event)
  }
}
