import { type EventEntity } from '@/core/entities'
import { faker } from '@faker-js/faker'

export const EventServiceMock: EventEntity = {
  id: 1,
  idUser: 1,
  idWineTourism: 2,
  payment: faker.commerce.price(),
  date: faker.date.anytime().toDateString(),
  hour: '15h30'
}
