import { Week, type WineTourismEntity } from '@/core/entities'
import { faker } from '@faker-js/faker'

export const WineTourismMock = (idWinery: number): WineTourismEntity => {
  return {
    id: 1,
    idWinery,
    description: faker.word.sample(),
    duration: '1h30',
    endHour: '16h',
    startHour: '8h',
    name: faker.word.sample(),
    openDays: Week.All,
    price: faker.commerce.price()
  }
}
