import { type WineTourismServicePort } from '@/infra/services/port'
import { describe, test, vi, expect } from 'vitest'
import { type WineTourismUseCasePort } from '../port'
import { left } from '@/shared/errors/either'
import { type WineTourismAppDto } from '../dto'
import { DataServiceNotFound } from '@/infra/services/errors/data.service.error'
import { WineTourismMemoryService } from '@/infra/services/memory/wine-tourism.memory.service'
import { WineTourismUseCase } from '../usecase'
import { WineTourismAppDtoMock } from '../__mocks__/wine-tourism.app.mock'

interface Factory {
  usecase: WineTourismUseCasePort
  service: WineTourismServicePort
}

function FactoryUseCase (): Factory {
  const service = new WineTourismMemoryService()
  const usecase = new WineTourismUseCase(service)

  return { service, usecase }
}

describe('# Wine Tourism usecase', () => {
  test('Create wine tourism', async () => {
    const { usecase } = FactoryUseCase()
    const wineTourismMock = WineTourismAppDtoMock

    const result = await usecase.create(wineTourismMock)

    expect(result.value).toStrictEqual(true)
  })

  test('Error to create the wine tourism', async () => {
    const { usecase, service } = FactoryUseCase()
    const wineTourismMock = WineTourismAppDtoMock

    vi.spyOn(service, 'create').mockResolvedValueOnce(left(new Error('Test winery usecase')))

    const result = await usecase.create(wineTourismMock)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Update the wine tourism', async () => {
    const { usecase } = FactoryUseCase()
    const wineTourismMock = Object.create(WineTourismAppDtoMock) as WineTourismAppDto

    await usecase.create(wineTourismMock)
    wineTourismMock.name = 'Test winery case'
    const result = await usecase.update(wineTourismMock)
    const winetourism = await usecase.findById(wineTourismMock.id!)

    expect(result.value).toStrictEqual(true)
    expect(winetourism.value).toStrictEqual(wineTourismMock)
  })

  test('Error to update the wine tourism - Wine tourism not found', async () => {
    const { usecase } = FactoryUseCase()
    const wineTourismMock = WineTourismAppDtoMock

    const result = await usecase.update(wineTourismMock)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to update the wine tourism - Service error', async () => {
    const { usecase, service } = FactoryUseCase()
    const wineTourismMock = WineTourismAppDtoMock

    vi.spyOn(service, 'update').mockResolvedValueOnce(left(new Error('Test usecase wine tourism update')))

    const result = await usecase.update(wineTourismMock)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Find the wine tourism by ID', async () => {
    const { usecase } = FactoryUseCase()
    const wineTourismMock = WineTourismAppDtoMock

    await usecase.create(wineTourismMock)

    const result = await usecase.findById(wineTourismMock.id!)

    expect(result.value).toStrictEqual(wineTourismMock)
  })

  test('Error to find wine tourism by ID - ID not found', async () => {
    const { usecase } = FactoryUseCase()
    const wineTourismMock = WineTourismAppDtoMock

    const result = await usecase.findById(wineTourismMock.id!)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to find wine tourism by ID - Service Error', async () => {
    const { usecase, service } = FactoryUseCase()
    const wineTourismMock = WineTourismAppDtoMock

    vi.spyOn(service, 'findById').mockResolvedValueOnce(left(new Error('Test case wine tourism find by ID')))
    const result = await usecase.findById(wineTourismMock.id!)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Success to delete the wine tourism', async () => {
    const { usecase } = FactoryUseCase()
    const wineTourismMock = WineTourismAppDtoMock

    await usecase.create(wineTourismMock)
    const result = await usecase.delete(wineTourismMock.id!)
    const winery = await usecase.findById(wineTourismMock.id!)

    expect(result.value).toStrictEqual(result.value)
    expect(winery.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to delete the wine tourism - ID not found', async () => {
    const { usecase } = FactoryUseCase()
    const wineTourismMock = WineTourismAppDtoMock

    const result = await usecase.delete(wineTourismMock.id!)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to delete the wine tourism - Service error', async () => {
    const { usecase, service } = FactoryUseCase()
    const wineTourismMock = WineTourismAppDtoMock

    vi.spyOn(service, 'delete').mockResolvedValueOnce(left(new Error('Test case delete the wine tourism')))
    const result = await usecase.delete(wineTourismMock.id!)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Success to get all wine tourism', async () => {
    const { usecase } = FactoryUseCase()
    const wineTourismMock = WineTourismAppDtoMock

    await usecase.create(wineTourismMock)
    const result = await usecase.findAll()
    const value = result.value as WineTourismAppDto []

    expect(value.length).toBeGreaterThan(0)
    expect(value[0]).toStrictEqual(wineTourismMock)
  })

  test('Error to get all wine tourism - Service error', async () => {
    const { usecase, service } = FactoryUseCase()

    vi.spyOn(service, 'findAll').mockResolvedValueOnce(left(new Error('Test case to get all wine tourism')))
    const result = await usecase.findAll()

    expect(result.value).toBeInstanceOf(Error)
  })
})
