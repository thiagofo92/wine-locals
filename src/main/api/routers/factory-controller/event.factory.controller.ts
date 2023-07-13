import { EventPrismaService } from '@/infra/services/prisma'
import { EventController } from '../../controllers'
import { EventUseCase } from '@/app/usecase'

export function eventFactoryController (): EventController {
  const service = new EventPrismaService()
  const usecase = new EventUseCase(service)

  return new EventController(usecase)
}
