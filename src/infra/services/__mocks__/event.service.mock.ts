import { type EventEntity } from '@/core/entities'
import { faker } from '@faker-js/faker'

export const EventServiceMock: EventEntity = {
  id: 0,
  idUser: '',
  idWineTourism: 0,
  payment: faker.commerce.price(),
  date: faker.date.anytime().toLocaleDateString(),
  hour: '15h30'
}
