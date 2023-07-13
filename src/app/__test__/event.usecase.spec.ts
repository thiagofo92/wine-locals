import { EventMemoryService } from '@/infra/services/memory/event.memory.service'
import { type EventServicePort } from '@/infra/services/port'
import { describe, test, vi, expect } from 'vitest'
import { type EventUseCasePort } from '../port'
import { EventUseCase } from '../usecase'
import { EventAppDtoMock } from '../__mocks__/event.app.mock'
import { left } from '@/shared/errors/either'
import { type EventAppDto } from '../dto'

interface Factory {
  usecase: EventUseCasePort
  service: EventServicePort
}

function FactoryUseCase (): Factory {
  const service = new EventMemoryService()
  const usecase = new EventUseCase(service)

  return { service, usecase }
}

describe('# Event usecase', () => {
  test('Create event experience', async () => {
    const { usecase } = FactoryUseCase()
    const eventMock = EventAppDtoMock
    const result = await usecase.create(eventMock)

    expect(result.value).toStrictEqual(true)
  })

  test('Error to create the event', async () => {
    const { usecase, service } = FactoryUseCase()
    const eventMock = EventAppDtoMock

    vi.spyOn(service, 'create').mockResolvedValueOnce(left(new Error('Test usecase Event')))
    const result = await usecase.create(eventMock)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Find all event', async () => {
    const { usecase } = FactoryUseCase()
    const eventMock = EventAppDtoMock

    await usecase.create(eventMock)
    const result = await usecase.findAll()
    const value = result.value as EventAppDto []

    expect(value.length).toBeGreaterThan(0)
    expect(value[0]).toStrictEqual(eventMock)
  })

  test('Error to find all events', async () => {
    const { usecase, service } = FactoryUseCase()

    vi.spyOn(service, 'findAll').mockResolvedValueOnce(left(new Error('Test usecase Event')))
    const result = await usecase.findAll()

    expect(result.value).toBeInstanceOf(Error)
  })
})
