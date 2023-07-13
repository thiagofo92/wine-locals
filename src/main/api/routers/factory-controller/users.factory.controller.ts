import { UserUseCase } from '@/app/usecase'
import { UserPrismaService } from '@/infra/services/prisma'
import { UsersControllers } from '../../controllers'

export function userFactoryController (): UsersControllers {
  const service = new UserPrismaService()
  const usecase = new UserUseCase(service)

  return new UsersControllers(usecase)
}
