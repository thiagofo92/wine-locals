/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { userFactoryController } from './factory-controller/users.factory.controller'
import { wineTourismFactoryController, wineryFactoryController } from './factory-controller'
import { eventFactoryController } from './factory-controller/event.factory.controller'
import { UserCreateMiddleware, UserValidateMiddleware, UserByIdMiddleware } from '../middlewares/schema/user.schema'
import {
  WineTourismByIdMiddleware, EventCreateMiddleware, WineTourismUpdateMiddleware,
  WineryByIdMiddleware, WineryCreateMiddleware, WineryUpdateMiddleware
} from '../middlewares/schema'
import { validate } from '../middlewares/auth/auth.jwt.middleware'

export class RoutersServer {
  constructor (private readonly router: Router) {}

  private users (): void {
    const controller = userFactoryController()
    this.router.post('/users', UserCreateMiddleware, controller.create.bind(controller))
    this.router.get('/users', validate, UserByIdMiddleware, controller.findById.bind(controller))
    this.router.post('/users/validate', UserValidateMiddleware, controller.validate.bind(controller))
  }

  private winery (): void {
    const controller = wineryFactoryController()
    this.router.post('/winery', validate, WineryCreateMiddleware, controller.create.bind(controller))
    this.router.put('/winery', validate, WineryUpdateMiddleware, controller.update.bind(controller))
    this.router.get('/winery', validate, WineryByIdMiddleware, controller.findById.bind(controller))
    this.router.delete('/winery', validate, WineryByIdMiddleware, controller.delete.bind(controller))
    this.router.get('/winery/list', validate, controller.findAll.bind(controller))
  }

  private wineTourism (): void {
    const controller = wineTourismFactoryController()
    this.router.post('/wine-tourism', validate, EventCreateMiddleware, controller.create.bind(controller))
    this.router.put('/wine-tourism', validate, WineTourismUpdateMiddleware, controller.update.bind(controller))
    this.router.get('/wine-tourism', validate, WineTourismByIdMiddleware, controller.findById.bind(controller))
    this.router.delete('/wine-tourism', validate, WineTourismByIdMiddleware, controller.delete.bind(controller))
    this.router.get('/wine-tourism/list', validate, controller.findAll.bind(controller))
  }

  private event (): void {
    const controller = eventFactoryController()
    this.router.post('/events', validate, EventCreateMiddleware, controller.create.bind(controller))
    this.router.get('/events/list', validate, controller.findAll.bind(controller))
  }

  build (): Router {
    this.users()
    this.winery()
    this.wineTourism()
    this.event()

    return this.router
  }
}
