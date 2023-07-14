import { describe, expect, test, vi } from 'vitest'
import { UserMock } from '../__mocks__/user.service.mock'
import { left } from '@/shared/errors/either'
import { DataServiceNotFound } from '../errors/data.service.error'
import { type UserEntity } from '@/core/entities'
import { type UserServicePort } from '../port'
import { UserPrismaService } from '../prisma'
import { randomUUID } from 'crypto'
import { UserValidateFail } from '../errors/user.service.error'
interface Factory {
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
function FactoryService (): Factory {
  const service = new UserPrismaService()
  return { service }
}

describe('# User service', () => {
  test('Register user to database', async () => {
    const { service } = FactoryService()
    const user = UserMock()
    const result = await service.create(user)

    expect(result.value).toStrictEqual(user.id)
  })

  test('Fail to register user', async () => {
    const { service } = FactoryService()
    const user = UserMock()
    vi.spyOn(service, 'create').mockResolvedValueOnce(left(new Error()))
    const result = await service.create(user)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Update user', async () => {
    const { service } = FactoryService()
    const user = UserMock()
    await service.create(user)
    user.name = 'Test'
    user.password = 'test'

    const result = await service.update(user)
    expect(result.value).toStrictEqual(true)
  })

  test('Not found user to update', async () => {
    const { service } = FactoryService()
    const user = Object.create(UserMock)
    user.id = '1234'
    const result = await service.update(user)
    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Delete user', async () => {
    const { service } = FactoryService()
    const user = UserMock()

    await service.create(user)
    const result = await service.delete(user.id)

    expect(result.value).toStrictEqual(true)
  })

  test('User not found when try to delete', async () => {
    const { service } = FactoryService()
    const user = UserMock()

    const result = await service.delete(user.id)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Find user by id', async () => {
    const { service } = FactoryService()
    const user = UserMock()

    await service.create(user)
    const result = await service.findById(user.id)

    expect(result.value).toStrictEqual(user)
  })

  test('User not found using ID', async () => {
    const { service } = FactoryService()

    const result = await service.findById('asf')
    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Find all user', async () => {
    const { service } = FactoryService()
    const user = UserMock()

    await service.create(user)
    const result = await service.findAll()
    const value = result.value as UserEntity []
    expect(value.length).toBeGreaterThan(0)
  })

  test('Valide the email and password', async () => {
    const { service } = FactoryService()
    const user = UserMock()

    await service.create(user)
    const result = await service.validate(user.email, user.password)

    expect(result.value).not.toBeInstanceOf(UserValidateFail)
  })
})
