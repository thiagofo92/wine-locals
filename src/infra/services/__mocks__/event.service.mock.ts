import { type EventEntity } from '@/core/entities'
import { faker } from '@faker-js/faker'

export const EventServiceMock = (idUser: string, idWineTourism: number): EventEntity => {
  return {
    id: 0,
    idUser,
    idWineTourism,
    payment: faker.commerce.price(),
    date: faker.date.anytime().toLocaleDateString(),
    hour: '15h30'
  }
}
