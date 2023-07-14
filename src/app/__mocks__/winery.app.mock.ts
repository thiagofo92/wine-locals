import { faker } from '@faker-js/faker'
import { type WineryAppDto } from '../dto'
import { randomInt } from 'crypto'

export const WineryAppDtoMock = (): WineryAppDto => {
  return {
    id: randomInt(500),
    name: faker.company.name(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    site: faker.internet.domainName()
  }
}
