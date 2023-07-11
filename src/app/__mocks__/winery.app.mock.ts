import { faker } from '@faker-js/faker'
import { type WineryAppDto } from '../dto'

export const WineryAppDtoMock: WineryAppDto = {
  id: 1,
  name: faker.company.name(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
  site: faker.internet.domainName()
}
