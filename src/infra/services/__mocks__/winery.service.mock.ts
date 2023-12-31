import { type WineryEntity } from '@/core/entities'
import { faker } from '@faker-js/faker'

export const WineryMock = (): WineryEntity => {
  return {
    name: faker.company.name(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    site: faker.internet.domainName()
  }
}
