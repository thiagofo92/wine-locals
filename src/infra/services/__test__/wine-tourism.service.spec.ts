import { describe, test, vi, expect, afterAll, beforeEach, beforeAll } from 'vitest'
import { type WineTourismEntity } from '@/core/entities'
import { left } from '@/shared/errors/either'
import { DataServiceNotFound } from '../errors/data.service.error'
import { WineTourismMock } from '../__mocks__/wine-tourism.service.mock'
import { type WineTourismServicePort } from '../port'
import { WineTourismPrismaService } from '../prisma'
import { PrismaConnection } from '../prisma/connection/connection'
import { WineryMock } from '../__mocks__/winery.service.mock'

interface Factory {
  service: WineTourismServicePort
}

interface WineTourismCreated { id: number }

function FactoryService (): Factory {
  const service = new WineTourismPrismaService()
  return { service }
}
describe('#WineTourism case', () => {
  beforeAll(async () => {
    const result = await PrismaConnection.winery.create({
      data: WineryMock
    })

    WineTourismMock.idWinery = result.id
  })

  afterAll(async () => {
    await PrismaConnection.winery.deleteMany()
  })

  beforeEach(async () => {
    await PrismaConnection.wine_tourism.deleteMany()
  })
  test('Create the wine tourism experience', async () => {
    const { service } = FactoryService()
    const wineryTourism = WineTourismMock

    const result = await service.create(wineryTourism)
    const value = result.value as WineTourismCreated
    const wine = await service.findById(value.id)

    expect(wine.value).not.toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to create the wine tourism experience', async () => {
    const { service } = FactoryService()

    vi.spyOn(service, 'create').mockResolvedValueOnce(left(new Error('Test')))
    const result = await service.create({} as any)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Update wine tourism', async () => {
    const { service } = FactoryService()
    const wine = Object.create(WineTourismMock) as WineTourismEntity

    wine.name = 'Test'
    wine.duration = '30min'
    const wineResult = await service.create(WineTourismMock)
    const value = wineResult.value as WineTourismCreated
    wine.id = value.id
    const result = await service.update(wine)

    expect(result.value).toStrictEqual(true)
  })

  test('Data not found - To update', async () => {
    const { service } = FactoryService()
    const wineTourism = WineTourismMock

    const result = await service.update(wineTourism)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to update the wine tourism', async () => {
    const { service } = FactoryService()

    vi.spyOn(service, 'update').mockResolvedValueOnce(left(new Error('Server error')))
    const result = await service.update({} as any)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Delete the wine tourism', async () => {
    const { service } = FactoryService()
    const winery = WineTourismMock
    const wineResult = await service.create(winery)
    const value = wineResult.value as WineTourismCreated

    winery.id = value.id
    const result = await service.delete(winery.id)

    expect(result.value).toStrictEqual(true)
  })

  test('Data not found - To delete', async () => {
    const { service } = FactoryService()

    const result = await service.delete(-1)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to update the wine tourism', async () => {
    const { service } = FactoryService()

    vi.spyOn(service, 'update').mockResolvedValueOnce(left(new Error('Server error')))
    const result = await service.update({} as any)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Find wine tourism by id', async () => {
    const { service } = FactoryService()
    const winery = WineTourismMock
    const wineResult = await service.create(winery)
    const value = wineResult.value as WineTourismCreated

    winery.id = value.id
    const result = await service.findById(winery.id)

    expect(result.value).toStrictEqual(winery)
  })

  test('Data not found - FindbyID', async () => {
    const { service } = FactoryService()

    const result = await service.findById(-1)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to findby id the wine tourism', async () => {
    const { service } = FactoryService()

    vi.spyOn(service, 'findById').mockResolvedValueOnce(left(new Error('Server error')))
    const result = await service.findById({} as any)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('FindAll wine tourism success', async () => {
    const { service } = FactoryService()
    const winery = WineTourismMock

    const wineryResult = await service.create(winery)
    const { id } = wineryResult.value as WineTourismCreated
    const result = await service.findAll()

    winery.id = id
    const value = result.value as WineTourismEntity[]
    expect(value.length).toBeGreaterThan(0)
    expect(value[0]).toStrictEqual(winery)
  })

  test('Error to findby id the wine tourism', async () => {
    const { service } = FactoryService()

    vi.spyOn(service, 'findAll').mockResolvedValueOnce(left(new Error('Server error')))
    const result = await service.findAll()

    expect(result.value).toBeInstanceOf(Error)
  })
})
