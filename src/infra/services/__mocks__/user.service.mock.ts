import { UserEntity } from "@/core/entities";
import { randomUUID } from "crypto";
import { faker } from '@faker-js/faker'

export const UserMock = new UserEntity({
  id: randomUUID(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  birthday: faker.date.birthdate().toUTCString(),
  cpf: faker.string.numeric({ length: 11 }),
  password: faker.internet.password({ length: 10 })
})