import { WineryPrismaService } from '@/infra/services/prisma'
import { WineryController } from '../../controllers'
import { WineryUseCase } from '@/app/usecase'

export function wineryFactoryController (): WineryController {
  const service = new WineryPrismaService()
  const usecase = new WineryUseCase(service)

  return new WineryController(usecase)
}
