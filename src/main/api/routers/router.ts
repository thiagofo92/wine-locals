/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { userFactoryController } from './factory-controller/users.factory.controller'
import { wineTourismFactoryController, wineryFactoryController } from './factory-controller'
import { eventFactoryController } from './factory-controller/event.factory.controller'

export class RoutersServer {
  constructor (private readonly router: Router) {}

  private users (): void {
    const controller = userFactoryController()
    this.router.post('/users', controller.create.bind(controller))
    this.router.get('/users/id', controller.findById.bind(controller))
    this.router.post('/users/validate', controller.validate.bind(controller))
  }

  private winery (): void {
    const controller = wineryFactoryController()
    this.router.post('/winery', controller.create.bind(controller))
    this.router.put('/winery', controller.update.bind(controller))
    this.router.get('/winery/id', controller.findById.bind(controller))
    this.router.delete('/winery/id', controller.delete.bind(controller))
    this.router.get('/winery', controller.findAll.bind(controller))
  }

  private wineTourism (): void {
    const controller = wineTourismFactoryController()
    this.router.post('/winery', controller.create.bind(controller))
    this.router.put('/winery', controller.update.bind(controller))
    this.router.get('/winery/id', controller.findById.bind(controller))
    this.router.delete('/winery/id', controller.delete.bind(controller))
    this.router.get('/winery', controller.findAll.bind(controller))
  }

  private event (): void {
    const controller = eventFactoryController()
    this.router.post('/event', controller.create)
    this.router.get('/event', controller.findAll)
  }

  build (): Router {
    this.users()
    this.winery()
    this.wineTourism()
    this.event()

    return this.router
  }
}
