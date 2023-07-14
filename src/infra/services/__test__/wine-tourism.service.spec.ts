import { describe, test, vi, expect, beforeAll } from 'vitest'
import { type WineTourismEntity } from '@/core/entities'
import { left } from '@/shared/errors/either'
import { DataServiceNotFound } from '../errors/data.service.error'
import { WineTourismMock } from '../__mocks__/wine-tourism.service.mock'
import { type WineTourismServicePort } from '../port'
import { WineTourismPrismaService } from '../prisma'
import { PrismaConnection } from '../prisma/connection/connection'
import { randomUUID } from 'crypto'

interface Factory {
  service: WineTourismServicePort
}

interface WineTourismCreated { id: number }
const requestInfo = { data: '', requestId: randomUUID() }
vi.mock('@/shared/util/async-hook', () => {
  return {
    Context: {
      get: vi.fn(() => requestInfo)
    }
  }
})
function FactoryService (): Factory {
  const service = new WineTourismPrismaService()
  return { service }
}

let idWinery = 0
describe('#WineTourism case', () => {
  beforeAll(async () => {
    const winery = await PrismaConnection.winery.findFirst()
    idWinery = winery!.id
  })

  test('Create the wine tourism experience', async () => {
    const { service } = FactoryService()
    const wineryTourism = WineTourismMock(idWinery)

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
    const wine = WineTourismMock(idWinery)

    const wineResult = await service.create(wine)
    wine.name = 'Test'
    wine.duration = '30min'
    const value = wineResult.value as WineTourismCreated
    wine.id = value.id
    const result = await service.update(wine)

    expect(result.value).toStrictEqual(true)
  })

  test('Data not found - To update', async () => {
    const { service } = FactoryService()
    const wineTourism = WineTourismMock(idWinery)

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
    const winery = WineTourismMock(idWinery)
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
    const winery = WineTourismMock(idWinery)
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
    const winery = WineTourismMock(idWinery)

    const wineryResult = await service.create(winery)
    const { id } = wineryResult.value as WineTourismCreated
    const result = await service.findAll()

    winery.id = id
    const value = result.value as WineTourismEntity[]
    expect(value.length).toBeGreaterThan(0)
  })

  test('Error to findby id the wine tourism', async () => {
    const { service } = FactoryService()

    vi.spyOn(service, 'findAll').mockResolvedValueOnce(left(new Error('Server error')))
    const result = await service.findAll()

    expect(result.value).toBeInstanceOf(Error)
  })
})
