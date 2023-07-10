import { describe, expect, test, vi } from 'vitest'
import { UserMemoryService } from '../memory/user.memory.service'
import { UserMock } from '../__mocks__/user.mock'
import { left } from '@/shared/errors/either'

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
})