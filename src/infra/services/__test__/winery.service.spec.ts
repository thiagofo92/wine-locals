import { beforeEach, describe, expect, test, vi } from 'vitest'
import { WineryMock } from '../__mocks__/winery.service.mock'
import { left } from '@/shared/errors/either'
import { type WineryEntity } from '@/core/entities'
import { DataServiceNotFound } from '../errors/data.service.error'
import { type WineryServicePort } from '../port'
import { WineryPrismaService } from '../prisma/winery.prisma.service'
import { PrismaConnection } from '../prisma/connection/connection'

interface Factory {
  service: WineryServicePort
}

interface WineCreated { id: number }

function FactoryService (): Factory {
  const service = new WineryPrismaService()
  return { service }
}

describe('# Winery Service case', () => {
  beforeEach(async () => {
    await PrismaConnection.winery.deleteMany()
  })

  test('Create winery', async () => {
    const { service } = FactoryService()

    const winery = WineryMock
    const result = await service.create(winery)
    const value = result.value as WineCreated
    const wineryResult = await service.findById(value.id)

    expect(wineryResult.value).not.toBeInstanceOf(Error)
  })

  test('Error to create the winery', async () => {
    const { service } = FactoryService()

    vi.spyOn(service, 'create').mockResolvedValueOnce(left(new Error('Test')))
    const result = await service.create({} as any)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Update winery', async () => {
    const { service } = FactoryService()
    const winery = Object.create(WineryMock) as WineryEntity

    winery.name = 'Test'
    winery.address = 'Home'
    const wineryResult = await service.create(WineryMock)
    const value = wineryResult.value as WineCreated
    winery.id = value.id
    const result = await service.update(winery)

    expect(result.value).toStrictEqual(true)
  })

  test('Data not found - To update', async () => {
    const { service } = FactoryService()
    const winery = Object.create(WineryMock) as WineryEntity

    winery.name = 'Test'
    winery.address = 'Home'
    winery.id = -1
    const result = await service.update(winery)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to update the winery', async () => {
    const { service } = FactoryService()

    vi.spyOn(service, 'update').mockResolvedValueOnce(left(new Error('Server error')))
    const result = await service.update({} as any)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Delete the winery', async () => {
    const { service } = FactoryService()
    const winery = WineryMock
    const wineryResult = await service.create(WineryMock)
    const value = wineryResult.value as WineCreated
    winery.id = value.id

    const result = await service.delete(winery.id)

    expect(result.value).toStrictEqual(true)
  })

  test('Data not found - To delete', async () => {
    const { service } = FactoryService()

    const result = await service.delete(-1)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to update the winery', async () => {
    const { service } = FactoryService()

    vi.spyOn(service, 'update').mockResolvedValueOnce(left(new Error('Server error')))
    const result = await service.update({} as any)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Find winery by id', async () => {
    const { service } = FactoryService()
    const winery = WineryMock
    await service.create(winery)
    const result = await service.findById(winery.id!)

    expect(result.value).toStrictEqual(winery)
  })

  test('Data not found - FindbyID', async () => {
    const { service } = FactoryService()

    const result = await service.findById(-1)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to findby id the winery', async () => {
    const { service } = FactoryService()

    vi.spyOn(service, 'findById').mockResolvedValueOnce(left(new Error('Server error')))
    const result = await service.findById({} as any)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('FindAll winery success', async () => {
    const { service } = FactoryService()
    const winery = WineryMock

    await service.create(winery)
    const result = await service.findAll()

    const value = result.value as WineryEntity[]
    expect(value.length).toBeGreaterThan(0)
    expect(value[0]).toStrictEqual(winery)
  })

  test('Error to findby id the winery', async () => {
    const { service } = FactoryService()

    vi.spyOn(service, 'findAll').mockResolvedValueOnce(left(new Error('Server error')))
    const result = await service.findAll()

    expect(result.value).toBeInstanceOf(Error)
  })
})
