import { describe, expect, test, vi } from 'vitest'
import { WineryMemoryService } from '../memory/winery.memory.service'
import { WineryMock } from '../__mocks__/winery.service.mock'
import { left } from '@/shared/errors/either'
import { type WineryEntity } from '@/core/entities'
import { DataServiceNotFound } from '../errors/data.service.error'

describe('# Winery Service case', () => {
  test('Create winery', async () => {
    const service = new WineryMemoryService()

    const winery = WineryMock
    const result = await service.create(winery)

    expect(result.value).toStrictEqual(true)
  })

  test('Error to create the winery', async () => {
    const service = new WineryMemoryService()

    vi.spyOn(service, 'create').mockResolvedValueOnce(left(new Error('Test')))
    const result = await service.create({} as any)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Update winery', async () => {
    const service = new WineryMemoryService()
    const winery = Object.create(WineryMock) as WineryEntity

    winery.name = 'Test'
    winery.address = 'Home'
    await service.create(WineryMock)
    const result = await service.update(winery)

    expect(result.value).toStrictEqual(true)
  })

  test('Data not found - To update', async () => {
    const service = new WineryMemoryService()

    const result = await service.update({} as any)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to update the winery', async () => {
    const service = new WineryMemoryService()

    vi.spyOn(service, 'update').mockResolvedValueOnce(left(new Error('Server error')))
    const result = await service.update({} as any)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Delete the winery', async () => {
    const service = new WineryMemoryService()
    const winery = WineryMock
    await service.create(winery)
    const result = await service.delete(winery.id!)

    expect(result.value).toStrictEqual(true)
  })

  test('Data not found - To delete', async () => {
    const service = new WineryMemoryService()

    const result = await service.delete(-1)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to update the winery', async () => {
    const service = new WineryMemoryService()

    vi.spyOn(service, 'update').mockResolvedValueOnce(left(new Error('Server error')))
    const result = await service.update({} as any)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Find winery by id', async () => {
    const service = new WineryMemoryService()
    const winery = WineryMock
    await service.create(winery)
    const result = await service.findById(winery.id!)

    expect(result.value).toStrictEqual(winery)
  })

  test('Data not found - FindbyID', async () => {
    const service = new WineryMemoryService()

    const result = await service.findById(-1)

    expect(result.value).toBeInstanceOf(DataServiceNotFound)
  })

  test('Error to findby id the winery', async () => {
    const service = new WineryMemoryService()

    vi.spyOn(service, 'findById').mockResolvedValueOnce(left(new Error('Server error')))
    const result = await service.findById({} as any)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('FindAll winery success', async () => {
    const service = new WineryMemoryService()
    const winery = WineryMock

    await service.create(winery)
    const result = await service.findAll()

    const value = result.value as WineryEntity[]
    expect(value.length).toBeGreaterThan(0)
    expect(value[0]).toStrictEqual(winery)
  })

  test('Error to findby id the winery', async () => {
    const service = new WineryMemoryService()

    vi.spyOn(service, 'findAll').mockResolvedValueOnce(left(new Error('Server error')))
    const result = await service.findAll()

    expect(result.value).toBeInstanceOf(Error)
  })
})
