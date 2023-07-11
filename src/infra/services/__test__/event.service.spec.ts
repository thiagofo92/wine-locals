import { describe, test, vi, expect } from 'vitest'
import { EventMemoryService } from '../memory/event.memory.service'
import { left } from '@/shared/errors/either'
import { EventServiceMock } from '../__mocks__/event.service.mock'
import { type EventEntity } from '@/core/entities'

describe('# Event case', () => {
  test('Create the event tourism experience', async () => {
    const service = new EventMemoryService()
    const eventMock = EventServiceMock

    const result = await service.create(eventMock)

    expect(result.value).toStrictEqual(true)
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
