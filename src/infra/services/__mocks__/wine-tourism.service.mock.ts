import { WineTourismEntity } from '@/core/entities'
import { faker } from '@faker-js/faker'

export const WineTourismMock: WineTourismEntity = {
  id: 1,
  idWinery: 2,
  description: faker.word.sample(),
  duration: '1h30',
  endHour: '16h',
  startHour: '8h',
  name: faker.word.sample(),
  openDays: WineTourismEntity.Week.All,
  price: faker.commerce.price()
}
