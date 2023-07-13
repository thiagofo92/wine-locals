import { describe, test, vi, expect, beforeAll } from 'vitest'
import { EventMemoryService } from '../memory/event.memory.service'
import { left } from '@/shared/errors/either'
import { EventServiceMock } from '../__mocks__/event.service.mock'
import { type EventEntity } from '@/core/entities'
import { type EventServicePort } from '../port'
import { EventPrismaService, UserPrismaService, WineTourismPrismaService, WineryPrismaService } from '../prisma'
import { UserMock } from '../__mocks__/user.service.mock'
import { WineryMock } from '../__mocks__/winery.service.mock'
import { WineTourismMock } from '../__mocks__/wine-tourism.service.mock'
interface Factory {
  service: EventServicePort
}

function FactoryService (): Factory {
  const service = new EventPrismaService()
  return { service }
}

describe('# Event case', () => {
  beforeAll(async () => {
    const usersService = new UserPrismaService()
    const wineryService = new WineryPrismaService()
    const wineService = new WineTourismPrismaService()

    const [user, winery] = await Promise.all([
      usersService.create(UserMock),
      wineryService.create(WineryMock)
    ])

    WineTourismMock.idWinery = winery.value.id
    const wine = await wineService.create(WineTourismMock)

    EventServiceMock.idUser = user.value.id
    EventServiceMock.idWineTourism = wine.value.id
  })

  test('Create the event tourism experience', async () => {
    const { service } = FactoryService()
    const eventMock = EventServiceMock

    const result = await service.create(eventMock)

    expect(result.value.id).not.toBeNull()
  })

  test('Error to create the event experience', async () => {
    const service = new EventMemoryService()

    vi.spyOn(service, 'create').mockResolvedValueOnce(left(new Error('Test')))
    const result = await service.create({} as any)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Find all events', async () => {
    const service = new EventMemoryService()
    const eventMock = EventServiceMock

    await service.create(eventMock)
    const result = await service.findAll()
    const value = result.value as EventEntity []

    expect(value.length).toBeGreaterThan(0)
    expect(value[0]).toStrictEqual(eventMock)
  })
})
