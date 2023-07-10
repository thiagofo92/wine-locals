import { UserMemoryService } from "@/infra/services/memory/user.memory.service";
import { describe, test, expect, vi } from "vitest";
import { UserUseCase } from "../usecase/user.usecase";
import { UserAppMock } from "../__mocks__/user.app.mock";
import { faker } from "@faker-js/faker";
import { UserUseCaseLegalAgeError } from "../errors";

describe('# UserUsecase test', () => {
  test('Create a new user', async () => {
    const service = new UserMemoryService()
    const usecase = new UserUseCase(service)
    const input = UserAppMock
    
    const result = await usecase.create(input)
    const value = result.value as string
    expect(value.length).toBeGreaterThan(35)
  })

  test('User dont has the legal age', async () => {
    const service = new UserMemoryService()
    const usecase = new UserUseCase(service)
    const input = UserAppMock
   
    input.birthday = faker.date.birthdate({ min: 10, max: 17 }).toUTCString()
    const result = await usecase.create(input)
   
    expect(result.value).toBeInstanceOf(UserUseCaseLegalAgeError)
  })
})