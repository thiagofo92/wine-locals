import { faker } from '@faker-js/faker'
import { type UserAppDto } from '../dto'
import { randomUUID } from 'crypto'

export const UserAppMock: UserAppDto = {
  id: randomUUID(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  cpf: faker.string.numeric({ length: 11 }),
  birthday: faker.date.birthdate().toLocaleDateString()
}
