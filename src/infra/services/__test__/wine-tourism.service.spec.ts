import { describe, test, vi, expect } from 'vitest'
import { WineTourismMemoryService } from '../memory/wine-tourism.memory.service'
import { type WineTourismEntity } from '@/core/entities'
import { left } from '@/shared/errors/either'
import { DataServiceNotFound } from '../errors/data.service.error'
import { WineTourismMock } from '../__mocks__/wine-tourism.service.mock'

describe('#WineTourism case', () => {
  test('Create the wine tourism experience', async () => {
    const service = new WineTourismMemoryService()
    const wineryTourism = WineTourismMock

    const result = await service.create(wineryTourism)

    expect(result.value).toStrictEqual(true)
  })

  test('Error to create the wine tourism experience', async () => {
    const service = new WineTourismMemoryService()

    vi.spyOn(service, 'create').mockResolvedValueOnce(left(new Error('Test')))
    const result = await service.create({} as any)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Update wine tourism', async () => {
    const service = new WineTourismMemoryService()
    const winery = Object.create(WineTourismMock) as WineTourismEntity

    winery.name = 'Test'
    winery.duration = '30min'
    await service.create(WineTourismMock)
    const result = await service.update(winery)

    expect(result.value).toStrictEqual(true)
  })

  test('Data not found - To update', async () => {
    const service = new WineTourismMemoryService()

    const result = await service.update({} as any)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to update the wine tourism', async () => {
    const service = new WineTourismMemoryService()

    vi.spyOn(service, 'update').mockResolvedValueOnce(left(new Error('Server error')))
    const result = await service.update({} as any)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Delete the wine tourism', async () => {
    const service = new WineTourismMemoryService()
    const winery = WineTourismMock
    await service.create(winery)
    const result = await service.delete(winery.id!)

    expect(result.value).toStrictEqual(true)
  })

  test('Data not found - To delete', async () => {
    const service = new WineTourismMemoryService()

    const result = await service.delete(-1)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to update the wine tourism', async () => {
    const service = new WineTourismMemoryService()

    vi.spyOn(service, 'update').mockResolvedValueOnce(left(new Error('Server error')))
    const result = await service.update({} as any)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Find wine tourism by id', async () => {
    const service = new WineTourismMemoryService()
    const winery = WineTourismMock
    await service.create(winery)
    const result = await service.findById(winery.id!)

    expect(result.value).toStrictEqual(winery)
  })

  test('Data not found - FindbyID', async () => {
    const service = new WineTourismMemoryService()

    const result = await service.findById(-1)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to findby id the wine tourism', async () => {
    const service = new WineTourismMemoryService()

    vi.spyOn(service, 'findById').mockResolvedValueOnce(left(new Error('Server error')))
    const result = await service.findById({} as any)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('FindAll wine tourism success', async () => {
    const service = new WineTourismMemoryService()
    const winery = WineTourismMock

    await service.create(winery)
    const result = await service.findAll()

    const value = result.value as WineTourismEntity[]
    expect(value.length).toBeGreaterThan(0)
    expect(value[0]).toStrictEqual(winery)
  })

  test('Error to findby id the wine tourism', async () => {
    const service = new WineTourismMemoryService()

    vi.spyOn(service, 'findAll').mockResolvedValueOnce(left(new Error('Server error')))
    const result = await service.findAll()

    expect(result.value).toBeInstanceOf(Error)
  })
})
