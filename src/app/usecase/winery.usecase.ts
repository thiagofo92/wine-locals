import { right, type Either, left } from '@/shared/errors/either'
import { type WineryUseCasePort } from '../port'
import { type WineryServicePort } from '@/infra/services/port'
import { type WineryAppDto } from '../dto'

export class WineryUseCase implements WineryUseCasePort {
  constructor (private readonly service: WineryServicePort) {}

  async create (input: WineryAppDto): Promise<Either<Error, { id: number }>> {
    const result = await this.service.create(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }

  async update (input: WineryAppDto): Promise<Either<Error, boolean>> {
    const result = await this.service.update(input)

    if (result.isLeft()) {
      return left(result.value)
    }
    return right(true)
  }

  async delete (id: number): Promise<Either<Error, boolean>> {
    const result = await this.service.delete(id)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }

  async findById (id: number): Promise<Either<Error, WineryAppDto>> {
    const result = await this.service.findById(id)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }

  async findAll (): Promise<Either<Error, WineryAppDto[]>> {
    const result = await this.service.findAll()

    if (result.isLeft()) {
      return left(result.value)
    }
    return right(result.value)
  }
}
