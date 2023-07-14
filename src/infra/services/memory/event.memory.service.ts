import { type EventEntity } from '@/core/entities'
import { right, type Either } from '@/shared/errors/either'
import { type EventServicePort } from '../port'
import { randomInt } from 'crypto'

export class EventMemoryService implements EventServicePort {
  private readonly event: EventEntity [] = []
  async create (input: EventEntity): Promise<Either<Error, { id: number }>> {
    input.id = randomInt(500)
    this.event.push(input)
    return right({ id: input.id })
  }

  async findAll (): Promise<Either<Error, EventEntity[]>> {
    return right(this.event)
  }
}
