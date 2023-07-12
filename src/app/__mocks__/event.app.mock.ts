import { faker } from '@faker-js/faker'
import { type EventAppDto } from '../dto'

export const EventAppDtoMock: EventAppDto = {
  id: 1,
  idUser: 1,
  idWineTourism: 2,
  payment: faker.commerce.price(),
  date: faker.date.anytime().toDateString(),
  hour: '15h30'
}
