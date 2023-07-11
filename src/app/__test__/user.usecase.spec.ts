import { UserMemoryService } from '@/infra/services/memory/user.memory.service'
import { describe, test, expect, vi } from 'vitest'
import { UserUseCase } from '../usecase/user.usecase'
import { UserAppMock } from '../__mocks__/user.app.mock'
import { faker } from '@faker-js/faker'
import { UserUseCaseLegalAgeError } from '../errors'
import { type UserServicePort } from '@/infra/services/port'
import { left } from '@/shared/errors/either'

interface Factory {
  usecase: UserUseCase
  service: UserServicePort
}

function FactoryUseCase (): Factory {
  const service = new UserMemoryService()
  const usecase = new UserUseCase(service)

  return { service, usecase }
}

describe('# UserUsecase test', () => {
  test('Create a new user', async () => {
    const { usecase } = FactoryUseCase()
    const input = UserAppMock

    const result = await usecase.create(input)
    const value = result.value as string
    expect(value.length).toBeGreaterThan(35)
  })

  test('User dont has the legal age', async () => {
    const { usecase } = FactoryUseCase()
    const input = Object.create(UserAppMock)

    input.birthday = faker.date.birthdate({ min: 10, max: 17 }).toUTCString()
    const result = await usecase.create(input)

    expect(result.value).toBeInstanceOf(UserUseCaseLegalAgeError)
  })

  test('Error to create the user', async () => {
    const { usecase, service } = FactoryUseCase()
    const input = UserAppMock

    vi.spyOn(service, 'create').mockResolvedValueOnce(left(new Error('Test use case')))

    const result = await usecase.create(input)

    expect(result.value).toBeInstanceOf(Error)
  })
})
