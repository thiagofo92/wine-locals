import { type WineTourismEntity } from '@/core/entities'
import { right, type Either, left } from '@/shared/errors/either'
import { type WineTourismSerivcePort } from '../port'
import { DataServiceNotFound } from '../errors/data.service.error'

export class WineTourismMemoryService implements WineTourismSerivcePort {
  private readonly wineTourims: WineTourismEntity[] = []
  async create (input: WineTourismEntity): Promise<Either<Error, boolean>> {
    this.wineTourims.push(input)
    return right(true)
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
