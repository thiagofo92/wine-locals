import { describe, expect, test, vi } from 'vitest'
import { UserMemoryService } from '../memory/user.memory.service'
import { UserMock } from '../__mocks__/user.mock'
import { left } from '@/shared/errors/either'
import { UserServiceUserNotFound } from '../errors/user.service.error'
import { UserEntity } from '@/core/entities'

describe("# User service", () => {
  test("Register user to database", async () => {
    const service = new UserMemoryService()
    const user = UserMock
    const result = await service.create(user)

    expect(result.value).toStrictEqual(user.id)
  })

  test("Fail to register user", async () => {
    const service = new UserMemoryService()
    const user = UserMock
    vi.spyOn(service, 'create').mockResolvedValueOnce(left(new Error()))
    const result = await service.create(user)

    expect(result.value).toBeInstanceOf(Error)
  })

  test("Update user", async () => {
    const service = new UserMemoryService()
    const user = UserMock
    await service.create(user)
    user.name = "Test"
    user.email = 'test@test.com.br'

    const result = await service.update(user)
    expect(result.value).toStrictEqual(true)
  })

  test("Not found user to update", async () => {
    const service = new UserMemoryService()
    const user = UserMock
    await service.create(user)
    user.name = "Test"
    user.email = 'test@test.com.br'

    vi.spyOn(service, 'update').mockResolvedValueOnce(left(new UserServiceUserNotFound()))
    const result = await service.update(user)
    expect(result.value).toBeInstanceOf(UserServiceUserNotFound)
  })

  test("Delete user", async () => {
    const service = new UserMemoryService()
    const user = UserMock

    await service.create(user)
    const result = await service.delete(user.id)

    expect(result.value).toStrictEqual(true)
  })

  test("User not found when try to delete", async () => {
    const service = new UserMemoryService()
    const user = UserMock

    vi.spyOn(service, 'delete').mockResolvedValueOnce(left(new UserServiceUserNotFound()))

    await service.create(user)
    const result = await service.delete(user.id)

    expect(result.value).toBeInstanceOf(UserServiceUserNotFound)
  })

  test("Find user by id", async () => {
    const service = new UserMemoryService()
    const user = UserMock

    await service.create(user)
    const result = await service.findById(user.id)

    expect(result.value).toStrictEqual(user)
  })

  test("User not found using ID", async () => {
    const service = new UserMemoryService()

    const result = await service.findById('asf')
    expect(result.value).toBeInstanceOf(UserServiceUserNotFound)
  })

  test("Find all user", async () => {
    const service = new UserMemoryService()
    const user = UserMock
    
    await service.create(user)
    const result = await service.findAll()
    const value = result.value as UserEntity []
    expect(value.length).toBeGreaterThan(0)
  })

  test("Valide the email and password", async () => {
    const service = new UserMemoryService()
    const user = UserMock

    await service.create(user)
    const result = await service.validate(user.email, user.password)

    expect(result.value).toStrictEqual(true)
  })
})