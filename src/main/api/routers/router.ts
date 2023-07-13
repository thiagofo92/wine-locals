/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { userFactoryController } from './factory-controller/users.factory.controller'

export class RoutersServer {
  constructor (private readonly router: Router) {}

  private users (): void {
    const controller = userFactoryController()
    this.router.post('/users', controller.create.bind(controller))
  }

  build (): Router {
    this.users()

    return this.router
  }
}
