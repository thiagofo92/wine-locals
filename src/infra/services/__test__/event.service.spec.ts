import { describe, test, vi, expect, beforeAll } from 'vitest'
import { EventMemoryService } from '../memory/event.memory.service'
import { left } from '@/shared/errors/either'
import { EventServiceMock } from '../__mocks__/event.service.mock'
import { type EventEntity } from '@/core/entities'
import { type EventServicePort } from '../port'
import { EventPrismaService } from '../prisma'
import { PrismaConnection } from '../prisma/connection/connection'
import { randomUUID } from 'crypto'
interface Factory {
  service: EventServicePort
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
  const service = new EventPrismaService()
  return { service }
}
let idUser = ''
let idWineTourism = 0

describe('# Event case', () => {
  beforeAll(async () => {
    const user = await PrismaConnection.users.findFirst()
    const wine = await PrismaConnection.wine_tourism.findFirst()

    idUser = user!.uuid
    idWineTourism = wine!.id
  })

  test('Create the event tourism experience', async () => {
    const { service } = FactoryService()
    const eventMock = EventServiceMock(idUser, idWineTourism)

    const result = await service.create(eventMock)
    if (result.isLeft()) throw new Error('Error to create event')
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
    const eventMock = EventServiceMock(idUser, idWineTourism)

    await service.create(eventMock)
    const result = await service.findAll()
    const value = result.value as EventEntity []

    expect(value.length).toBeGreaterThan(0)
    expect(value[0]).toStrictEqual(eventMock)
  })
})
