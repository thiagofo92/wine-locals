import { WineryMemoryService } from '@/infra/services/memory/winery.memory.service'
import { type WineryServicePort } from '@/infra/services/port'
import { describe, test, vi, expect } from 'vitest'
import { type WineryUseCasePort } from '../port'
import { WineryUseCase } from '../usecase/winery.usecase'
import { WineryAppDtoMock } from '../__mocks__/winery.app.mock'
import { left } from '@/shared/errors/either'
import { type WineryAppDto } from '../dto'
import { DataServiceNotFound } from '@/infra/services/errors/data.service.error'

interface Factory {
  usecase: WineryUseCasePort
  service: WineryServicePort
}

function FactoryUseCase (): Factory {
  const service = new WineryMemoryService()
  const usecase = new WineryUseCase(service)

  return { service, usecase }
}

describe('# Winery usecase', () => {
  test('Create winery', async () => {
    const { usecase } = FactoryUseCase()
    const wineryMock = WineryAppDtoMock

    const result = await usecase.create(wineryMock)

    expect(result.value).toStrictEqual(true)
  })

  test('Error to create the winery', async () => {
    const { usecase, service } = FactoryUseCase()
    const wineryMock = WineryAppDtoMock

    vi.spyOn(service, 'create').mockResolvedValueOnce(left(new Error('Test winery usecase')))

    const result = await usecase.create(wineryMock)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Update the winery', async () => {
    const { usecase } = FactoryUseCase()
    const wineryMock = Object.create(WineryAppDtoMock) as WineryAppDto

    await usecase.create(wineryMock)
    wineryMock.name = 'Test winery case'
    const result = await usecase.update(wineryMock)
    const winery = await usecase.findById(wineryMock.id!)

    expect(result.value).toStrictEqual(true)
    expect(winery.value).toStrictEqual(wineryMock)
  })

  test('Error to update the winery - Winery not found', async () => {
    const { usecase } = FactoryUseCase()
    const wineryMock = WineryAppDtoMock

    const result = await usecase.update(wineryMock)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to update the winery - Service error', async () => {
    const { usecase, service } = FactoryUseCase()
    const wineryMock = WineryAppDtoMock

    vi.spyOn(service, 'update').mockResolvedValueOnce(left(new Error('Test usecase winery update')))

    const result = await usecase.update(wineryMock)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Find the winery by ID', async () => {
    const { usecase } = FactoryUseCase()
    const wineryMock = WineryAppDtoMock

    await usecase.create(wineryMock)

    const result = await usecase.findById(wineryMock.id!)

    expect(result.value).toStrictEqual(wineryMock)
  })

  test('Error to find winery by ID - ID not found', async () => {
    const { usecase } = FactoryUseCase()
    const wineryMock = WineryAppDtoMock

    const result = await usecase.findById(wineryMock.id!)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to find winery by ID - Service Error', async () => {
    const { usecase, service } = FactoryUseCase()
    const wineryMock = WineryAppDtoMock

    vi.spyOn(service, 'findById').mockResolvedValueOnce(left(new Error('Test case winery find by ID')))
    const result = await usecase.findById(wineryMock.id!)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Success to delete the winery', async () => {
    const { usecase } = FactoryUseCase()
    const wineryMock = WineryAppDtoMock

    await usecase.create(wineryMock)
    const result = await usecase.delete(wineryMock.id!)
    const winery = await usecase.findById(wineryMock.id!)

    expect(result.value).toStrictEqual(result.value)
    expect(winery.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to delete the winery - ID not found', async () => {
    const { usecase } = FactoryUseCase()
    const wineryMock = WineryAppDtoMock

    const result = await usecase.delete(wineryMock.id!)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to delete the winery - Service error', async () => {
    const { usecase, service } = FactoryUseCase()
    const wineryMock = WineryAppDtoMock

    vi.spyOn(service, 'delete').mockResolvedValueOnce(left(new Error('Test case delete the winery')))
    const result = await usecase.delete(wineryMock.id!)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Success to get all winery', async () => {
    const { usecase } = FactoryUseCase()
    const wineryMock = WineryAppDtoMock

    await usecase.create(wineryMock)
    const result = await usecase.findAll()
    const value = result.value as WineryAppDto []

    expect(value.length).toBeGreaterThan(0)
    expect(value[0]).toStrictEqual(wineryMock)
  })

  test('Error to get all winery - Service error', async () => {
    const { usecase, service } = FactoryUseCase()

    vi.spyOn(service, 'findAll').mockResolvedValueOnce(left(new Error('Test case to get all winery')))
    const result = await usecase.findAll()

    expect(result.value).toBeInstanceOf(Error)
  })
})
