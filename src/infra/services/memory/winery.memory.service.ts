import { type WineryEntity } from '@/core/entities'
import { right, type Either, left } from '@/shared/errors/either'
import { type WineryServicePort } from '../port/winery.service.port'
import { DataServiceNotFound } from '../errors/data.service.error'

export class WineryMemoryService implements WineryServicePort {
  private readonly winery: WineryEntity[] = []

  async create (input: WineryEntity): Promise<Either<Error, boolean>> {
    this.winery.push(input)
    return right(true)
  }

  async update (input: WineryEntity): Promise<Either<Error, boolean>> {
    const index = this.winery.findIndex(item => item.id === input.id)

    if (index < 0) return left(new DataServiceNotFound())

    this.winery[index] = input

    return right(true)
  }

  async delete (id: number): Promise<Either<Error, boolean>> {
    const index = this.winery.findIndex(item => item.id === id)

    if (index < 0) return left(new DataServiceNotFound())

    this.winery.splice(index, 1)

    return right(true)
  }

  async findById (id: number): Promise<Either<Error, WineryEntity>> {
    const index = this.winery.findIndex(item => item.id === id)

    if (index < 0) return left(new DataServiceNotFound())

    return right(this.winery[index])
  }

  async findAll (): Promise<Either<Error, WineryEntity[]>> {
    return right(this.winery)
  }
}
