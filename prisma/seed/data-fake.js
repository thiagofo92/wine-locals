/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const { randomUUID } = require('node:crypto')
const { PrismaClient } = require('@prisma/client')
const { faker } = require('@faker-js/faker')
const { createLogger, transports, format } = require('winston')
;(async () => {
  const connection = new PrismaClient()
  const options = {
    level: process.env.NODE_ENV === 'product' ? 'info' : 'debug',
    format: format.combine(format.json(), format.timestamp(), format.colorize({ all: true })),
    transports: [new transports.Console()]
  }
    
  const Logger = createLogger(options)
  try {

    const user = await connection.users.create({
      data: {
        uuid: randomUUID(),
        password: '1234',
        name: faker.person.fullName(),
        cpf: faker.string.numeric({ length: 11 }),
        birthday: faker.date.birthdate().toLocaleDateString(),
        email: faker.internet.email()
      }
    })

    const winery = await connection.winery.create({
      data: {
        state: faker.location.state(),
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        site: faker.internet.domainName()
      }
    })

    Logger.info(user)
  } catch (error) {
    Logger.error(error)
  } finally {
    await connection.$disconnect()
  }
})()
