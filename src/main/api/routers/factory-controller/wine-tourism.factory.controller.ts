import { WineTourismPrismaService } from '@/infra/services/prisma'
import { WineTourismController } from '../../controllers'
import { WineTourismUseCase } from '@/app/usecase'

export function wineTourismFactoryController (): WineTourismController {
  const service = new WineTourismPrismaService()
  const usecase = new WineTourismUseCase(service)

  return new WineTourismController(usecase)
}
