import { UserMemoryService } from '@/infra/services/memory/user.memory.service'
import { describe, test, expect, vi } from 'vitest'
import { UserUseCase } from '../usecase/user.usecase'
import { UserAppMock } from '../__mocks__/user.app.mock'
import { faker } from '@faker-js/faker'
import { UserUseCaseLegalAgeError } from '../errors'
import { type UserServicePort } from '@/infra/services/port'
import { left } from '@/shared/errors/either'
import { DataServiceNotFound } from '@/infra/services/errors/data.service.error'
import { UserValidateFail } from '@/infra/services/errors/user.service.error'
import { randomUUID } from 'crypto'
interface Factory {
  usecase: UserUseCase
  service: UserServicePort
}

const requestInfo = { data: '', requestId: randomUUID() }
vi.mock('@/shared/util/async-hook', () => {
  return {
    Context: {
      get: vi.fn(() => requestInfo)
    }
  }
})
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
    expect(value).toStrictEqual(input.id)
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

  test('Success to find the user by ID', async () => {
    const { usecase } = FactoryUseCase()
    const userMock = UserAppMock

    await usecase.create(userMock)
    const result = await usecase.findById(userMock.id)

    expect(result.value).toStrictEqual(userMock)
  })

  test('User not found', async () => {
    const { usecase } = FactoryUseCase()
    const userMock = UserAppMock

    const result = await usecase.findById(userMock.id)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to find the user by ID', async () => {
    const { usecase, service } = FactoryUseCase()
    const userMock = UserAppMock

    vi.spyOn(service, 'findById').mockResolvedValueOnce(left(new Error('Test case for find by id')))
    const result = await usecase.findById(userMock.id)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Validate the user using email and password', async () => {
    const { usecase } = FactoryUseCase()
    const input = UserAppMock

    await usecase.create(input)
    const result = await usecase.validate(input.email, input.password)

    const value = result.value as string
    expect(value).not.toBeInstanceOf(UserValidateFail)
  })

  test('Email or password not match in database', async () => {
    const { usecase } = FactoryUseCase()
    const input = UserAppMock

    await usecase.create(input)
    const result = await usecase.validate('', '')

    const value = result.value
    expect(value).toBeInstanceOf(UserValidateFail)
  })

  test('Error to try validate the user password and user email', async () => {
    const { usecase, service } = FactoryUseCase()

    vi.spyOn(service, 'validate').mockResolvedValueOnce(left(new Error('Test validate the user email and user password')))
    const result = await usecase.validate('', '')

    const value = result.value
    expect(value).toBeInstanceOf(Error)
  })
})
