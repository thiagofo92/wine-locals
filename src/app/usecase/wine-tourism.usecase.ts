import { right, type Either, left } from '@/shared/errors/either'
import { type WineTourismUseCasePort } from '../port'
import { type WineTourismServicePort } from '@/infra/services/port'
import { type WineTourismAppDto } from '../dto'

export class WineTourismUseCase implements WineTourismUseCasePort {
  constructor (private readonly service: WineTourismServicePort) {}

  async create (input: WineTourismAppDto): Promise<Either<Error, boolean>> {
    const result = await this.service.create(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }

  async update (input: WineTourismAppDto): Promise<Either<Error, boolean>> {
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

  async findById (id: number): Promise<Either<Error, WineTourismAppDto>> {
    const result = await this.service.findById(id)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }

  async findAll (): Promise<Either<Error, WineTourismAppDto[]>> {
    const result = await this.service.findAll()

    if (result.isLeft()) {
      return left(result.value)
    }
    return right(result.value)
  }
}
