import { faker } from '@faker-js/faker'
import { type EventAppDto } from '../dto'

export const EventAppDtoMock: EventAppDto = {
  idUser: '',
  idWineTourism: 2,
  payment: faker.commerce.price(),
  date: faker.date.anytime().toDateString(),
  hour: '15h30'
}
