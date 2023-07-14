import { type WineTourismEntity } from '@/core/entities'
import { right, type Either, left } from '@/shared/errors/either'
import { type WineTourismServicePort } from '../port'
import { DataServiceNotFound } from '../errors/data.service.error'
import { randomInt } from 'crypto'

export class WineTourismMemoryService implements WineTourismServicePort {
  private readonly wineTourims: WineTourismEntity[] = []
  async create (input: WineTourismEntity): Promise<Either<Error, { id: number }>> {
    input.id = randomInt(500)
    this.wineTourims.push(input)
    const result = {
      id: input.id
    }
    return right(result)
  }

  async update (input: WineTourismEntity): Promise<Either<Error, boolean>> {
    const index = this.wineTourims.findIndex(item => item.id === input.id)
    if (index < 0) return left(new DataServiceNotFound())

    this.wineTourims[index] = input

    return right(true)
  }

  async delete (id: number): Promise<Either<Error, boolean>> {
    const index = this.wineTourims.findIndex(item => item.id === id)

    if (index < 0) return left(new DataServiceNotFound())

    this.wineTourims.splice(index, 1)
    return right(true)
  }

  async findById (id: number): Promise<Either<Error, WineTourismEntity>> {
    const index = this.wineTourims.findIndex(item => item.id === id)
    if (index < 0) return left(new DataServiceNotFound())

    return right(this.wineTourims[index])
  }

  async findAll (): Promise<Either<Error, WineTourismEntity[]>> {
    return right(this.wineTourims)
  }
}
